<template>
  <router-link class="featured_stream" :to="'/watch/'+featured._id">
    <div class="featured_streamPreviewContainer">
      <img class="featured_streamPreview" :src="thumbnail" />
      <div class="live"></div>
      <div class="viewerCount"></div>
    </div>
    <div class="featured_streamMetaContainer">
      <div class="featured_streamNameContainer">
        <div class="featured_streamName">{{featured.stream_name}}</div>
      </div>
      <div class="streamPreviewDateTime">
        <div v-if="featured.is_scheduled" class="streamPreviewDateContainer unsetPosition streamDateSpecial">
          <div class="streamPreviewDate">{{ getStreamDate(featured)}}</div>
        </div>
        <div v-if="featured.is_scheduled" class="streamPreviewTimeContainer unsetPosition">
          <div class="streamPreviewTime">{{ getStreamTime(featured) }}</div>
        </div>
      </div>
      <div class="featured_streamTags">
        <div
          v-for="(tag, index) in featured.stream_tags"
          :key="index"
          class="featured_streamTag"
        >{{tag}}</div>
      </div>
      <div class="featured_streamer_profile_container_discover">
        <div class="featured_streamer_profile_image_container">
          <img class="featured_streamer_profile_icon_discover" :src="profileImage" />
        </div>
        <div class="featured_streamer_name_container_discover">
          <p
            class="featured_streamer_firstname_discover"
          >{{featured.streamer.firstname || featured.streamer.username}}</p>
          <p
            v-if="featured.streamer.firstname && featured.streamer.lastname"
            class="featured_streamer_lastname_discover"
          >{{ featured.streamer.lastname }}</p>
        </div>
      </div>
      <div class="featured_streamer_description_container_discover">
        <p v-html="featured.stream_description"></p>
      </div>
      <!--  if is live, show  'watch now !-->
      <div v-if="featured.is_live" class="watch_now">{{$t("streams.watch")}}</div>
      <div v-if="featured.is_scheduled" class="watch_now">{{$t("streams.register")}}</div>
      <!--  if is scheduled, show  'register for event' -->
      <!--  if is scheduled/live && has_price show 'Get ticket $price' -->
    </div>
  </router-link>
</template>

<script>
import profileIcon from "../assets/images/profile_icon.png";

export default {
  name: "Featured",
  props: ["featured"],
  computed: {
    thumbnail() {
      if (this.featured.thumbnail_url) {
        return this.featured.thumbnail_url;
      }
      return `https://img.youtube.com/vi/${this.featured.stream_video_id}/hqdefault.jpg`;
    },
    profileImage() {
      if (this.featured.streamer.profile_image_url) {
        return this.featured.streamer.profile_image_url;
      }
      return profileIcon;
    }
  },
  methods: {
    getStreamTime(featured) {
      let time;
      if (featured.is_scheduled && featured.scheduled_time) {
        time = featured.scheduled_time;
        time = new Date(time);
        const options = { hour: "2-digit", minute: "2-digit" };
        time = time.toLocaleTimeString("et-EE", options);
      }
      return time;
    },
    getStreamDate(featured) {
      let time;
      if (featured.is_scheduled && featured.scheduled_time) {
        time = featured.scheduled_time;
        time = new Date(time);
        const options = { month: "long", day: "numeric" };
        time = time.toLocaleDateString("et-EE", options);
      }
      return time;
    }
  }
};
</script>

<style>

.streamPreviewDateTime {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
}

.unsetPosition {
  position: relative !important;
  background-color: white !important;
  box-shadow: unset !important;
  height: 50px !important;
}

.streamDateSpecial {
  margin-right: 10px !important;
}

.featured_streamer_description_container_discover span,
.scheduled_stream_description span {
  background-color: transparent !important;
  color: inherit !important;
}

.watch_now {
  padding: 20px;
  font-size: 30px;
  background-color: #130088;
  color: white;
  border-radius: 2px;
  margin-left: auto;
  margin-top: 50px;
  margin-right: auto;
  text-align: center;
  width: 97%;
  box-sizing: border-box;
}

.watch_now:hover {
  background-color: #120088bd;
}
</style>