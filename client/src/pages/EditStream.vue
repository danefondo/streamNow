<template>
  <div class="streaming_area">
    <div class="section_center">
      <div class="edit_stream_details">
        <div class="stream_details_block">
          <div @click="editStream" class="save_stream_changes">Save changes</div>
          <router-link :to="`/watch/${streamId}`" class="cancel_stream_changes">Cancel</router-link>
          <!-- <div class="stream_end_button margin-left-auto">End stream</div> -->
        </div>
        <div class="edit_stream_inputs">
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">Change livestream a name</div>
            <input
              v-model="name"
              class="stream_input stream_name"
              placeholder="Livestream name"
              value="Ajutine täitesisu, leht valmimisel"
              max-length="50"
            />
            <div v-if="nameEmpty && !name" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">Change livestream description</div>
            <textarea
              v-model="description"
              class="stream_input stream_description"
              placeholder="Describe your livestream"
            >Lehe täielikum funktsionaalsus lastakse peagi laivi.
        </textarea>
            <div v-if="descriptionEmpty && !description" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">Change tags (max 3)</div>
            <input-tag v-model="tags" id="input-tags" type="text" placeholder="Write a tag" />
            <div v-if="tagsEmpty && !tags.length" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <div class="stream_input_container edit_input">
            <div class="stream_input_title">Change YouTube video ID</div>
            <input
              v-model="videoId"
              class="stream_input stream_video_id_input"
              placeholder="e.g. NMPqo3XiOUg"
              value="Ue0xaq1Q-B4"
            />
            <div v-if="videoIdEmpty && !videoId" class="inputErrorContainer">
              <div class="inputErrorText">{{ $t("form.empty") }}</div>
            </div>
          </div>
          <ImageUpload v-model="image" :uploading="uploadingImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag';
import axios from 'axios';
import auth from '../config/auth'
import ImageUpload from '../components/ImageUpload';

export default {
  name: "EditStream",
  components: {
    InputTag,
    ImageUpload
  },
  data() {
    return {
      isScheduledOpened: false,
      streamId: null,
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
      uploadingImage: false,
      thumbnailKey: null,
      thumbnailUrl: null,
      thumbnailName: null
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
      this.videoId = stream.stream_video_id;
      this.thumbnailKey = stream.thumbnail_key;
      this.thumbnailUrl = stream.thumbnail_url;
      this.thumbnailName = stream.thumbnail_name;
      this.streamId = stream._id;
      this.image = {
        preview: stream.thumbnail_url
      };
      if (streamer._id !== auth.isAuthenticated()._id) {
          this.$router.push(`/watch/${this.streamId}`)
      }
    },
    toggle() {
      this.isScheduledOpened = !this.isScheduledOpened;
    },
    async editStream() {
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
          stream_id: this.streamId,
          stream_name: this.name,
          stream_description: this.description,
          stream_tags: this.tags,
          stream_video_id: this.videoId,
          is_live: true,
          thumbnail_key: this.thumbnailKey,
          thumbnail_url: this.thumbnailUrl,
          thumbnail_name: this.thumbnailName
        };
        if (this.image.file) {
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
  background-color: blue;
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
  align-items: start;
}

.stream_end_button:hover {
  color: #aaa;
}
.margin-left-auto {
  margin-left: auto;
}
</style>