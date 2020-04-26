<template>
  <a class="profileStream" :href="'/watch/'+stream._id">
    <div class="streamPreviewContainer">
      <img class="streamPreview" :src="thumbnail" />
      <div v-if="stream.is_scheduled" class="streamPreviewMeta">
        <div class="streamTime">{{ getStreamTime(stream) }}</div>
      </div>
    </div>
    <div class="streamMetaContainer">
      <div class="streamNameContainer">
        <div class="streamName">{{stream.stream_name || "Untitled stream"}}</div>
      </div>
      <div class="streamTags">
        <div v-for="(tag, index) in stream.stream_tags" :key="index" class="streamTag">{{tag}}</div>
      </div>
    </div>
  </a>
</template>

<script>
import profileIcon from "../assets/images/profile_icon.png";

export default {
  name: "Stream",
  props: ["stream"],
  computed: {
    thumbnail() {
      if (this.stream.thumbnail_url) {
        return this.stream.thumbnail_url;
      }
      return `https://img.youtube.com/vi/${this.stream.stream_video_id}/hqdefault.jpg`;
    },
    profileImage() {
      if (this.stream.streamer.profile_image_url) {
        return this.stream.streamer.profile_image_url;
      }
      return profileIcon;
    }
  },
  methods: {
    getStreamTime(stream) {
      let time;
      if (stream.is_scheduled && stream.scheduled_time) {
        console.log(stream.scheduled_time);
        time = stream.scheduled_time;
        time = new Date(time);
        const options = {hour: '2-digit', minute: '2-digit'};
        time = time.toLocaleTimeString('et-EE', options);
      }
      return time;
    }
  }
};
</script>

<style scoped>

.profileStream {
    min-width: 360px;
    width: 360px;
    margin: 30px 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 2px;
    padding: 25px 0px;
    padding-top: 10px;
    padding-bottom: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    transition: 0.1s ease;
}

.profileStream:hover {
  border: 1px solid #12008869;
  transform: scale(1.015);
  background-color: #efeff7;
}

</style>