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
      <textarea
        v-model="description"
        class="stream_input stream_description"
        placeholder="Briefly describe your livestream"
      ></textarea>
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
      <div class="stream_input_title">YouTube video ID</div>
      <input
        v-model="videoId"
        class="stream_input stream_video_id_input"
        placeholder="e.g. NMPqo3XiOUg"
      />
      <div v-if="videoIdEmpty && !videoId" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <ImageUpload v-model="image" :uploading="uploadingImage" />
    <div @click="submit()" :disabled="submitting" class="go_live">
      {{ submitting ? $t('scheduling.creating-stream') : $t('scheduling.go-live') }}</div>
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
        <div class="inputErrorContainer">
          <div class="inputErrorText"></div>
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
        <div class="inputErrorContainer">
          <div class="inputErrorText"></div>
        </div>
      </div>
      <div class="schedule_stream_section">
        <div class="stream_input_title">Privacy</div>
        <div class="switch-field">
          <input id="radio-one" type="radio" name="switch-one" value="public" checked />
          <label for="radio-one">Public</label>
          <input id="radio-two" type="radio" name="switch-one" value="unlisted" />
          <label for="radio-two">Unlisted</label>
        </div>
        <div class="inputErrorContainer">
          <div class="inputErrorText"></div>
        </div>
      </div>
      <div class="create_event">Create event</div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import InputTag from "vue-input-tag";
import ImageUpload from "../components/ImageUpload";
import axios from "axios";

export default {
  name: "GoLive",
  components: {
    Datepicker,
    InputTag,
    ImageUpload
  },
  data() {
    return {
      isScheduledOpened: false,
      date: new Date(),
      time: new Date(),
      name: "",
      description: "",
      tags: [],
      videoId: "",
      error: "",
      scheduleError: "",
      tagsEmpty: false,
      nameEmpty: false,
      descriptionEmpty: false,
      videoIdEmpty: false,
      submitting: false,
      image: null,
      uploadingImage: false
    };
  },
  methods: {
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async submit() {
      let isOneorMoreEmtpy = false;
      ["name", "description", "tags", "videoId"].forEach(each => {
        if (!this[each].length) {
          isOneorMoreEmtpy = true;
          this[`${each}Empty`] = true;
        }
      });
      if (isOneorMoreEmtpy) {
        return;
      }
      try {
        this.submitting = true;
        let streamData = {
          stream_name: this.name,
          stream_description: this.description,
          stream_tags: this.tags,
          stream_video_id: this.videoId,
          is_live: true
        };
        if (this.image) {
          streamData = { ...streamData, ...await this.uploadImage() };
        }
        const result = await axios.post(`dashboard/createLiveStream`, streamData);
        this.$router.push(`/watch/${result.data.stream_id}`);
      } catch (error) {
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
        method: 'PUT',
        body: this.image.file,
        headers: {
          'Content-Type': this.image.file.type,
          'processData': false,
        }
      });
      return Promise.resolve({
        thumbnail_key: result.fileName,
        thumbnail_url: response.url,
        thumbnail_name: this.stream_name
      })
    },
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
</style>