<template>
  <div v-if=" user && user.admin" class="contentArea">
    <div v-if="error" class="generalErrorContainer">
      <div class="generalErrorText">{{ $t("form.wrong") }}</div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">{{ $t("golive.give-name") }}</div>
      <input
        v-model="name"
        class="stream_input stream_name"
        :placeholder="$t('golive.name-holder')"
        max-length="50"
      />
      <div v-if="nameEmpty && !name" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">{{ $t("golive.give-desc") }}</div>
      <ckeditor
        :editor="editor"
        v-model="description"
        :config="editorConfig"
        class="unreset ckspecial"
      ></ckeditor>
      <div v-if="descriptionEmpty && !description" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">{{ $t("golive.give-tags") }}</div>
      <input-tag
        v-model="tags"
        :limit="limit"
        id="input-tags"
        type="text"
        :placeholder="$t('golive.tags-holder')"
      />
      <div v-if="tagsEmpty && !tags.length" class="inputErrorContainer">
        <div class="inputErrorText">{{ $t("form.empty") }}</div>
      </div>
    </div>
    <div class="stream_input_container">
      <div class="stream_input_title">{{ $t("golive.give-video") }}</div>
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
      <div class="stream_input_title inline">{{ $t("golive.later") }}</div>
      <img v-if="!isScheduledOpened" class="arrow" src="../assets/images/down_arrow.png" />
      <img v-else class="arrow" src="../assets/images/up_arrow.png" />
    </div>
    <div v-if="scheduleError" class="scheduleErrorContainer">
      <div class="scheduleErrorText">{{ $t("golive.fill-in") }}</div>
    </div>
    <div class="schedule_container" :class="{hidden: !isScheduledOpened}">
      <div class="schedule_stream_section">
        <div class="stream_input_title">{{ $t("golive.pick-date") }}</div>
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
        <div class="stream_input_title">{{ $t("golive.pick-time") }}</div>
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
        <div class="stream_input_title">{{ $t("golive.privacy") }}</div>
        <div class="switch-field">
          <input
            id="radio-one"
            type="radio"
            v-model="public_status"
            name="switch-one"
            value="public"
            checked
          />
          <label for="radio-one">{{ $t("golive.public") }}</label>
          <input
            id="radio-two"
            type="radio"
            v-model="public_status"
            name="switch-one"
            value="unlisted"
          />
          <label for="radio-two">{{ $t("golive.unlisted") }}</label>
        </div>
        <div class="inputErrorContainer">
          <div class="inputErrorText"></div>
        </div>
      </div>
      <div
        @click="submit('schedule')"
        class="create_event"
      >{{ submitting === 'schedule' ? $t('scheduling.updating-stream') : $t('scheduling.save') }}</div>
    </div>
  </div>
  <ShowInterest v-else />
</template>

<script>
import axios from "axios";
import auth from "../config/auth";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Datepicker from "vuejs-datepicker";
import InputTag from "vue-input-tag";
import ImageUpload from "../components/ImageUpload";
import ShowInterest from "../components/ShowInterest";

export default {
  name: "GoLive",
  components: {
    Datepicker,
    InputTag,
    ImageUpload,
    ShowInterest
  },
  data() {
    return {
      editor: DecoupledEditor,
      editorConfig: {
        placeholder: "Intrigue your audience",
        removePlugins: [
          "FontSize",
          "MediaEmbed",
          "insertTable",
          "Heading",
          "alignment",
          "Undo",
          "Redo",
          "FontFamily",
          "highlight"
        ],
        toolbar: [
          "bold",
          "italic",
          "|",
          "bulletedList",
          "numberedList",
          "Link",
          "blockQuote"
        ]
      },
      isScheduledOpened: false,
      date: new Date(),
      limit: 3,
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
      public_status: "public",
      user: {},
      isAuthenticated: false
    };
  },
  mounted() {
    if (auth.isAuthenticated()) {
      console.log("auth", auth.isAuthenticated());
      this.user = auth.isAuthenticated();
      this.isAuthenticated = true;
      console.log("user", this.user);
    }
  },
  methods: {
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async submit(type) {
      let isOneorMoreEmtpy = false;
      const requiredFields = ["name", "description", "tags", "videoLink"];
      if (type === "schedule") {
        requiredFields.pop();
        requiredFields.push("time");
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
          streamData.public_status = this.public_status;
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
          this.$emit("updateLive", true, result.data.stream_id);
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
.vue-input-tag-wrapper {
  border-radius: 3px !important;
  border: 1px solid #eee !important;
  margin-right: 16px !important;
  padding: 10px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  width: 325px !important;
  padding: 15px !important;
  display: block !important;
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6 !important;
  margin-top: 15px !important;
  box-sizing: border-box !important;
  font-family: "Trebuchet MS", sans-serif !important;
}

.vue-input-tag-wrapper .input-tag {
    color: unset !important;
    cursor: default !important;
    margin: 9px 7px 3px 0 !important;
    padding: 5px 6px !important;
    background: #f2f2f2 !important;
    font-size: 20px !important;
    border: 0 solid #d0d0d0 !important;
    display: inline-block !important;
}

.vue-input-tag-wrapper .input-tag .remove {
  color: unset !important;
}

.vue-input-tag-wrapper .new-tag {
  font-size: 18px !important;
}


.date_picker input {
  max-width: 285px !important;
  width: 285px !important;
  border-radius: 3px;
  border: 1px solid #eee;
  margin-right: 16px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px !important;
  display: block !important;
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
  margin-top: 15px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
}

.date_picker input:focus {
  border-left: 3px solid #120088;
}

.timepicker {
  max-width: 285px !important;
  width: 285px !important;
  border-radius: 3px;
  border: 1px solid #eee;
  margin-right: 16px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px !important;
  display: block !important;
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
  margin-top: 15px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
}

.timepicker:focus {
  border-left: 3px solid #120088;
}

/*! CSS Used from: https://www.eeter.tv/css/main.css */
.ckspecial {
  outline: none !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6 !important;
  border: 1px solid #eee !important;
  border-radius: 3px;
  border: 1px solid #eee;
  margin-right: 16px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 325px;
  padding: 15px !important;
  padding-top: 0px !important;
  display: block !important;
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
  margin-top: 15px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
}

.ckspecial:focus {
  border-left: 3px solid #120088 !important;
}
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