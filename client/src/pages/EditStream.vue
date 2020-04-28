<template>
  <div class="streaming_area">
    <div class="section_center">
      <div class="edit_stream_details">
        <div class="stream_details_block">
          <div @click="editStream" class="save_stream_changes">{{ $t("editstream.save") }}</div>
          <router-link
            :to="$route.query.manage ? '/manage-streams' :`/watch/${streamId}`"
            class="cancel_stream_changes"
          >{{ $t("editstream.cancel") }}</router-link>
          <!-- <div class="stream_end_button margin-left-auto">End stream</div> -->
        </div>
        <div class="edit_stream_inputs">
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">{{ $t("editstream.change-name") }}</div>
            <input
              v-model="name"
              class="stream_input stream_name"
              :placeholder="$t('editstream.name-holder')"
              value="Ajutine täitesisu, leht valmimisel"
              max-length="50"
            />
            <div v-if="nameEmpty && !name" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">{{ $t("editstream.change-desc") }}</div>
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
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">{{ $t("editstream.change-tags") }}</div>
            <input-tag
              v-model="tags"
              :limit="limit"
              id="input-tags"
              type="text"
              :placeholder="$t('editstream.tags-holder')"
            />
            <div v-if="tagsEmpty && !tags.length" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">{{ $t("editstream.change-video-link") }}</div>
            <input
              v-model="videoLink"
              class="stream_input stream_video_id_input"
              :placeholder="$t('editstream.video-placeholder')"
            />
            <div v-if="videoLinkEmpty && !videoLink" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <ImageUpload v-model="image" :uploading="uploadingImage" />
          <div v-if="!isLive" class="schedule_container">
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
              @click="editStream"
              class="create_event"
            >{{ submitting === 'schedule' ? $t('scheduling.updating-stream') : $t('scheduling.save') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputTag from "vue-input-tag";
import axios from "axios";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Datepicker from "vuejs-datepicker";
import auth from "../config/auth";
import ImageUpload from "../components/ImageUpload";

export default {
  name: "EditStream",
  components: {
    InputTag,
    ImageUpload,
    Datepicker
  },
  data() {
    return {
      editor: DecoupledEditor,
      limit: 3,
      isScheduledOpened: false,
      streamId: null,
      date: "",
      dateEmpty: "",
      time: "",
      timeEmpty: false,
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
      submitting: false,
      image: null,
      uploadingImage: false,
      thumbnailKey: null,
      thumbnailUrl: null,
      thumbnailName: null,
      isLive: null,
      public_status: "public",
      editorConfig: {
        placeholder: this.$t("editstream.change-desc"),
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
      }
    };
  },
  mounted() {
    this.getStream();
  },
  methods: {
    async getStream() {
      const {
        data: { stream, streamer }
      } = await axios.get(`/streams/${this.$route.params.id}`);
      this.name = stream.stream_name;
      this.description = stream.stream_description;
      this.tags = stream.stream_tags;
      this.videoLink = stream.stream_video_link;
      this.thumbnailKey = stream.thumbnail_key;
      this.thumbnailUrl = stream.thumbnail_url;
      this.thumbnailName = stream.thumbnail_name;
      this.isLive = stream.is_live;
      this.date = new Date(stream.scheduled_time);
      const hours = this.date.getHours() || "00";
      const minutes = this.date.getMinutes() || "00";
      this.time = `${hours}:${minutes}`
      this.public_status = stream.public_status;
      this.streamId = stream._id;
      if (stream.thumbnail_url) {
        this.image = {
          preview: stream.thumbnail_url
        };
      }
      if (streamer._id !== auth.isAuthenticated()._id) {
        this.$router.push(`/watch/${this.streamId}`);
      }
    },
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async editStream() {
      let isOneorMoreEmtpy = false;
      const requiredFields = ["name", "description", "tags"];
      if (this.isLive) {
        requiredFields.push("videoLink")
      } else {
        requiredFields.push("time");
      }
      requiredFields.forEach(each => {
        if (!this[each] || !this[each].length) {
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
          stream_id: this.streamId,
          stream_name: this.name,
          stream_description: this.description,
          stream_tags: this.tags,
          stream_video_link: this.videoLink,
          is_live: this.isLive,
          thumbnail_key: this.thumbnailKey,
          thumbnail_url: this.thumbnailUrl,
          thumbnail_name: this.thumbnailName,
        };
        if (!this.isLive) {
          const dateTime = this.date;
          const time = this.time.split(":");
          dateTime.setHours(time[0]);
          dateTime.setMinutes(time[1]);
          streamData.scheduled_time = dateTime;
          streamData.public_status = this.public_status;
        }
        if (this.image && this.image.file) {
          await this.uploadImage();
          streamData = {
            ...streamData,
            thumbnail_key: this.thumbnailKey,
            thumbnail_url: this.thumbnailUrl,
            thumbnail_name: this.thumbnailName
          };
        } else if (!this.image) {
          streamData = {
            ...streamData,
            thumbnail_key: null,
            thumbnail_url: null,
            thumbnail_name: null
          };
        }
        await axios.post(`dashboard/updateLiveStream`, streamData);
        if (this.$route.query.manage) {
          return this.$router.push(`/manage-streams`);
        }
        this.$router.push(`/watch/${this.streamId}`);
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
        method: "PUT",
        body: this.image.file,
        headers: {
          "Content-Type": this.image.file.type,
          processData: false
        }
      });
      this.thumbnailKey = result.fileName;
      this.thumbnailUrl = response.url;
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

/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.cancel_stream_changes,
.save_stream_changes {
  padding: 6px 16px;
  font-size: 17px;
  display: inline-block;
  border-radius: 3px;
  margin-right: 15px;
  text-align: center;
  transition: 0.2s ease;
  cursor: pointer;
  color: white;
  background-color: #130088;
}
.cancel_stream_changes:hover,
.save_stream_changes:hover {
  color: #aaa;
}
.cancel_stream_changes {
  background-color: #e6e6e6;
  color: #333;
}

.stream_details_block {
  padding: 10px;
  display: flex;
  /* justify-content: center; */
  width: 325px;
  margin: 0 auto;
}

.stream_end_button:hover {
  color: #aaa;
}
.margin-left-auto {
  margin-left: auto;
}
</style>