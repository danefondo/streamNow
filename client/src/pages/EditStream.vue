<template>
  <div class="streaming_area">
    <div v-if="showModal && streamId && isLive" class="confirm_end_modal">
      <div @click="showModal=false" class="confirm_modal_background editModalBackground"></div>
      <div class="confirm_modal">
        <div class="big-content-wrapper">
          <div class="confirm_modal_title">{{$t("watch.confirm-end")}}</div>
          <div class="end_stream_actions">
            <div @click="endStream" class="end_stream_confirm">{{$t("watch.end-stream")}}</div>
            <div
              @click="showModal = false "
              class="cancel_end_stream"
            >{{$t("watch.cancel-end-stream")}}</div>
          </div>
          <div class="end_stream_fail_message"></div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal && !isLive" class="deleteStreamModal">
      <div @click="showDeleteModal=false" class="deleteStreamModalBackground"></div>
      <div class="deleteStreamModalWrapper">
        <div class="deleteStreamContentWrapper">
          <div class="deleteStreamTextContainer">
            <div class="deleteStreamModalTitle">{{ $t("editstream.delete-confirm-title") }}</div>
            <div class="deleteStreamModalBody">{{ $t("editstream.delete-notice") }}</div>
          </div>
          <div class="action-group">
            <div
              @click="showDeleteModal=false"
              class="cancelDeleteStream button-outline"
            >{{ $t("editstream.cancel-delete") }}</div>
            <div
              @click="deleteStream"
              class="confirmPermaDeleteStream button-filled"
            >{{ $t("editstream.confirm-delete") }}</div>
          </div>
        </div>
      </div>
    </div>
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
        <div class="editStreamInputs">
          <div class="stream_input_container edit_stream_input">
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
          <div class="stream_input_container edit_stream_input">
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
          <div class="stream_input_container edit_stream_input">
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
          <div class="stream_input_container edit_stream_input">
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
          <div v-if="!isLive && isScheduled" class="schedule_container">
            <div class="schedule_stream_section">
              <div class="stream_input_title">{{ $t("golive.pick-date") }}</div>
              <div class="date_picker date_picker_special">
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
                  class="timepicker timepicker_special"
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
          </div>
          <div v-if="streamId && !isLive" class="stream_delete_section">
            <div class="success_input_title">{{ $t("editstream.delete-title") }}</div>
            <div class="section__streamSettings">
              <div class="deleteStreamText">{{ $t("editstream.delete-stream-desc") }}</div>
              <div @click="showDeleteModal=true" class="deleteStreamButton">
                <p class="deleteStreamButtonText">{{ $t("editstream.delete-stream") }}</p>
              </div>
            </div>
          </div>
          <div v-else-if="streamId && owner && isLive && !isScheduled" class="stream_delete_section">
            <div class="success_input_title">{{ $t("editstream.end-stream-title") }}</div>
            <div class="section__streamSettings">
              <div class="deleteStreamText">{{ $t("editstream.end-stream-notice") }}</div>
              <div
                @click="showModal = true"
                class="stream_end_button margin-left-auto streamEndEdit"
              >{{$t("watch.end-stream")}}</div>
            </div>
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
// import RemoveFormat from "@ckeditor/ckeditor5-remove-format";
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
      showDeleteModal: false,
      showModal: false,
      editor: DecoupledEditor,
      limit: 3,
      isScheduledOpened: false,
      streamId: null,
      streamerId: null,
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
      isScheduled: null,
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
          "highlight",
          "bold",
          "italic"
        ],
        toolbar: ["|", "bulletedList", "numberedList", "Link", "blockQuote"]
      }
    };
  },
  mounted() {
    this.getStream();
  },
  computed: {
    owner() {
      return this.streamerId === auth.isAuthenticated()._id;
    },
  },
  methods: {
    async getStream() {
      const {
        data: { stream, streamer }
      } = await axios.get(`/streams/${this.$route.params.id}`);
      this.name = stream.stream_name;
      this.description = stream.stream_description;
      this.tags = stream.stream_tags;
      this.streamerId = stream.streamer_id;
      this.videoLink = stream.stream_video_link;
      this.thumbnailKey = stream.thumbnail_key;
      this.thumbnailUrl = stream.thumbnail_url;
      this.thumbnailName = stream.thumbnail_name;
      this.isLive = stream.is_live;
      this.isScheduled = stream.is_scheduled;
      this.date = new Date(stream.scheduled_time);
      const hours = this.date.getHours() || "00";
      const minutes = this.date.getMinutes() || "00";
      this.time = `${hours}:${minutes}`;
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
    async endStream() {
      let date = new Date();
      await axios.post(`streams/${this.streamId}/endStream`, { date: date });
      this.showModal = false;
      this.isLive = false;
      this.$emit("updateLive", false);
    },
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async editStream() {
      let isOneorMoreEmtpy = false;
      const requiredFields = ["name", "description", "tags"];
      if (this.isLive) {
        requiredFields.push("videoLink");
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
          thumbnail_name: this.thumbnailName
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
    },
    async deleteStream() {
      try {
        await axios.delete(`/streams/${this.streamId}/deleteStream`);
        window.location.href = "/manage-streams";
      } catch (error) {
        console.log("err", error);
      }
    }
  }
};
</script>

<style>
.editStreamInputs {
  /* display: flex;
  flex-wrap: wrap; */
  margin-top: 40px;
  /* margin-left: 60px; */
}

.edit_stream_input {
  /* margin-right: 55px; */
  max-width: 325px;
}

.stream_delete_section {
  max-width: 325px;
  margin: 0 auto;
}

.success_input_title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.deleteStreamText {
  font-size: 17px;
  color: #424242;
  padding-top: 25px;
  line-height: 23px;
  padding-left: 7px;
  padding-right: 6px;
  line-height: 25px;
  font-weight: 400;
}
.deleteStreamButton {
  text-align: center;
  background-color: #a70029;
  padding: 15px;
  margin-top: 20px;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  display: block;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.deleteStreamButton {
  margin-bottom: 20px;
}
.deleteStreamButton:hover {
  transform: scale(1.02);
}
.section__streamSettings {
  padding: 7px 30px;
  border: 1px solid #f9f9f9;
  margin: 28px auto;
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px #f1f1f1;
  background-color: #fff;
  margin-bottom: 40px;
  min-height: 66px;
  margin-top: 14px;
  border: 1px solid #eaeaea;
  font-weight: bold;
  box-shadow: none;
}

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
  padding: 10px 16px;
  font-size: 18px;
  display: inline-block;
  border-radius: 2px;
  margin-right: 15px;
  text-align: center;
  transition: 0.2s ease;
  cursor: pointer;
  color: white;
  background-color: #130088;
  font-weight: bold;
}
.cancel_stream_changes:hover {
  color: #aaa;
}

.save_stream_changes:hover {
  background-color: #120088bd;
}

.cancel_stream_changes {
  background-color: #e6e6e6;
  color: #333;
  margin-right: 0px;
}

.stream_details_block {
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  width: 325px;
  margin: 0 auto;
}

.stream_end_button:hover {
  color: #aaa;
}
.margin-left-auto {
  margin-left: auto;
}

.deleteStreamModalBackground {
  background-color: #1f1f1f;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 1003;
  position: fixed;
  width: 100%;
  height: 100%;
}

.deleteStreamModalWrapper {
  position: fixed;
  z-index: 9999;
  top: 20%;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 350px;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  border: none;
  padding: 20px;
}

.confirmPermaDeleteStream.button-filled:hover {
    background-color: #a7002acc !important;
}

.button-filled {
  display: inline-block;
  font-weight: 600;
  color: white;
  letter-spacing: 0.1rem;
  background-color: #130089;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  padding: 12px;
  text-align: center;
  transition: 0.2s ease;
}
.button-filled:hover {
  background-color: #0000ff94;
}

.confirmPermaDeleteStream {
  margin-right: 12px;
  background-color: #a70029 !important;
}

.deleteStreamTextContainer {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.deleteStreamContentWrapper {
  width: 290px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.deleteStreamModalTitle {
  margin-top: 30px;
  font-size: 20px;
  width: 250px;
  text-align: center;
}
.deleteStreamModalBody {
  padding-top: 20px;
  font-weight: 100;
  font-size: 16px;
  display: block;
  width: 260px;
}

.streamEndEdit {
  margin: 12px auto;
}

.editModalBackground {
  left: 0;
  right: 0;
}
</style>