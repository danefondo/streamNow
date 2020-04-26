<template>
  <a class="stream" :href="'/watch/'+stream._id">
    <div class="streamPreviewContainer">
      <img class="streamPreview" :src="thumbnail" />
      <div v-if="stream.is_scheduled" class="streamPreviewMeta">
        <div class="streamTime">{{ getStreamTime(stream) }}</div>
      </div>
      <div class="live"></div>
      <div class="viewerCount"></div>
    </div>
    <div class="streamMetaContainer">
      <div class="streamNameContainer">
        <div class="streamName">{{stream.stream_name || "Untitled stream"}}</div>
      </div>
      <div class="streamTags">
        <div v-for="(tag, index) in stream.stream_tags" :key="index" class="streamTag">{{tag}}</div>
      </div>
      <div class="streamer_profile_container_discover">
        <div class="streamer_profile_image_container">
          <img class="streamer_profile_icon_discover" :src="profileImage" />
        </div>
        <div class="streamerLevelContainer">
          <div class="streamerStar"></div>
          <div class="streamerLevel"></div>
          <div class="verifiedSign hidden"></div>
        </div>
        <div class="streamer_name_container_discover">
          <p
            class="streamer_firstname_discover"
          >{{stream.streamer.firstname || stream.streamer.username}}</p>
          <p
            v-if="stream.streamer.firstname && stream.streamer.lastname"
            class="streamer_lastname_discover"
          >{{ stream.streamer.lastname }}</p>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import profileIcon from "../assets/images/profile_icon.png";

export default {
  name: "StreamBar",
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

<style>

  .streamPreviewContainer {
    position: relative;
  }

  .streamPreviewMeta {
    height: 48px;
    background-color: #fbfbfb;
    z-index: 9999;
    width: 31%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 2px 11px 0px rgba(10, 0, 70, 0.42);
  }

  .streamTime {
    padding: 11px 15px;
    font-weight: bold;
    font-size: 24px;
    color: #f4f3ff;
    color: #292295;
  }

</style>