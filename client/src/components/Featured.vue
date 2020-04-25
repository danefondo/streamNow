<template>
  <a class="featured_stream" :href="'/watch/'+featured._id">
    <div class="featured_streamPreviewContainer">
      <img class="featured_streamPreview" :src="thumbnail" />
      <div class="live"></div>
      <div class="viewerCount"></div>
    </div>
    <div class="featured_streamMetaContainer">
      <div class="featured_streamNameContainer">
        <div class="featured_streamName">{{featured.stream_name || "Untitled"}}</div>
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
        <p>{{featured.stream_description}}</p>
      </div>
      <!--  if is live, show  'watch now !-->
      <div class="watch_now">Watch now</div>
      <!--  if is scheduled, show  'register for event' -->
      <!--  if is scheduled/live && has_price show 'Get ticket $price' -->
    </div>
  </a>
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
  }
};
</script>

<style>
.watch_now {
  padding: 20px;
  font-size: 30px;
  background-color: #130088;
  color: white;
  border-radius: 2px;
  margin-left: auto;
  margin-top: 104px;
  margin-right: auto;
  text-align: center;
  width: 75%;
}

.watch_now:hover {
  background-color: #120088bd;
}
</style>