<template>
  <div class="contentArea">
    <div v-if="error" class="generalErrorContainer">
      <div class="generalErrorText">{{ $t("form.wrong") }}</div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">Give your livestream a name</div>
      <input
        v-model="name"
        class="stream_input stream_name"
        placeholder="Your livestream name"
        max-length="50"
      />
      <div v-if="nameEmpty && !name" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">What's your livestream about?</div>
      <ckeditor  :editor="editor" v-model="description"></ckeditor>
      <div v-if="descriptionEmpty && !description" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">Add tags (max 3)</div>
      <input-tag v-model="tags" id="input-tags" type="text" placeholder="Write a tag" />
      <div v-if="tagsEmpty && !tags.length" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">Add video link (YouTube, Facebook, Twitch)</div>
      <input
        v-model="videoLink"
        class="stream_input stream_video_id_input"
        :placeholder="$t('scheduling.link-placeholder')"
      />
      <div v-if="videoLinkEmpty && !videoLink" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <ImageUpload v-model="image" :uploading="uploadingImage" />
    <div
      @click="submit('live')"
      :disabled="submitting"
      class="go_live"
    >{{ submitting === 'live' ? $t('scheduling.creating-stream') : $t('scheduling.go-live') }}</div>
    <div @click="toggle" class="subArea">
      <div class="stream_input_title inline">Schedule for later?</div>
      <img v-if="!isScheduledOpened" class="arrow" src="../assets/images/down_arrow.png" />
      <img v-else class="arrow" src="../assets/images/up_arrow.png" />
    </div>
    <div v-if="scheduleError" class="scheduleErrorContainer">
      <div class="scheduleErrorText">Please fill in stream details below to schedule a stream.</div>
    </div>
    <div class="schedule_container" :class="{hidden: !isScheduledOpened}">
      <div class="schedule_stream_section">
        <div class="stream_input_title">Pick date</div>
        <div class="date_picker">
          <datepicker v-model="date" name="date"></datepicker>
          <button class="date_picker_button">
            <i class="fa fa-calendar"></i>
          </button>
        </div>
        <div v-if="dateEmpty && !date" class="inputErrorContainer">
          <div class="inputErrorText">{{ $t("form.empty") }}</div>
        </div>
      </div>
      <div class="schedule_stream_section">
        <div class="stream_input_title">Pick time</div>
        <div class="time_picker">
          <input
            v-model="time"
            class="timepicker"
            name="time"
            type="time"
            placeholder="Choose a time"
          />
          <button class="date_picker_button">
            <i class="fa fa-clock-o"></i>
          </button>
        </div>
        <div v-if="timeEmpty && !time" class="inputErrorContainer">
          <div class="inputErrorText">{{ $t("form.empty") }}</div>
        </div>
      </div>
      <div class="schedule_stream_section">
        <div class="stream_input_title">Privacy</div>
        <div class="switch-field">
          <input
            id="radio-one"
            type="radio"
            v-model="public_status"
            name="switch-one"
            value="public"
            checked
          />
          <label for="radio-one">Public</label>
          <input
            id="radio-two"
            type="radio"
            v-model="public_status"
            name="switch-one"
            value="unlisted"
          />
          <label for="radio-two">Unlisted</label>
        </div>
        <div class="inputErrorContainer">
          <div class="inputErrorText"></div>
        </div>
      </div>
      <div @click="submit('schedule')" class="create_event">
        {{ submitting === 'schedule' ? $t('scheduling.creating-stream') : 'Create Event' }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from "vuejs-datepicker";
import InputTag from "vue-input-tag";
import ImageUpload from "../components/ImageUpload";

export default {
  name: "GoLive",
  components: {
    Datepicker,
    InputTag,
    ImageUpload,
  },
  data() {
    return {
      editor: ClassicEditor,
      isScheduledOpened: false,
      date: new Date(),
      time: "",
      name: "",
      description: "",
      tags: [],
      videoLink: "",
      error: "",
      scheduleError: "",
      tagsEmpty: false,
      nameEmpty: false,
      descriptionEmpty: false,
      videoLinkEmpty: false,
      dateEmpty: false,
      timeEmpty: false,
      submitting: false,
      image: null,
      uploadingImage: false,
      public_status: "public"
    };
  },
  methods: {
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async submit(type) {
      let isOneorMoreEmtpy = false;
      const requiredFields = ["name", "description", "tags", "videoLink"];
      if (type === "schedule") {
        requiredFields.push("time")
      }
      requiredFields.forEach(each => {
        if (!this[each].length) {
          isOneorMoreEmtpy = true;
          this[`${each}Empty`] = true;
        }
      });
      if (isOneorMoreEmtpy) {
        return;
      }
      try {
        this.submitting = type;
        let streamData = {
          stream_name: this.name,
          stream_description: this.description,
          stream_tags: this.tags,
          stream_video_link: this.videoLink,
          is_live: type === "live" ? true : false,
          is_scheduled: type === "schedule" ? true : false
        };
        if (type === "schedule") {
          const dateTime = this.date;
          const time = this.time.split(":");
          dateTime.setHours(time[0]);
          dateTime.setMinutes(time[1]);
          streamData.scheduled_time = dateTime;
          streamData.public_status = this.public_status
        }
        if (this.image) {
          streamData = { ...streamData, ...(await this.uploadImage()) };
        }
        const result = await axios.post(
          `dashboard/createLiveStream`,
          streamData
        );
        this.$router.push(`/watch/${result.data.stream_id}`);
        if (type === "live") {
          this.$emit("updateLive", true, result.data.stream_id)
        }
      } catch (error) {
        window.scrollTo(0, 0);
        this.error = true;
        this.submitting = false;
      }
    },
    async uploadImage() {
      this.uploadingImage = true;
      const fileName = Date.now().toString();
      const { data: result } = await axios.get(
        `/dashboard/sign-s3?file-name=${fileName}&file-type=${this.image.file.type}`
      );
      const response = result.returnData;
      await fetch(response.signedRequest, {
        method: "PUT",
        body: this.image.file,
        headers: {
          "Content-Type": this.image.file.type,
          processData: false
        }
      });
      return Promise.resolve({
        thumbnail_key: result.fileName,
        thumbnail_url: response.url,
        thumbnail_name: this.stream_name
      });
    }
  }
};
</script>

<style>
/*! CSS Used from: https://www.eeter.tv/css/main.css */
* {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input:focus {
  outline: none;
}
input {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  background-color: #fff;
  font-family: "Trebuchet MS", sans-serif;
}
h3 {
  font-size: 18px;
  font-weight: 500;
}
div {
  display: block;
}
.show {
  display: block !important;
}
.hide {
  display: none !important;
}
.entryDetailsGroup {
  background-color: #fbfbfb;
  font-size: 20px;
  color: #0e0e0e;
  border-radius: 6px;
  position: relative;
  border: 1px solid #eee;
  margin-top: 15px;
  max-width: 325px;
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.padding-60 {
  padding-top: 60px;
  padding-bottom: 60px;
}
.auto-side-margins {
  margin-left: auto;
  margin-right: auto;
}
.ck-content {
  height: 200px;
}
</style>