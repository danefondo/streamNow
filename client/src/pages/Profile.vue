<template>
  <div class="profile">
    <div v-if="showModal" class="confirm_end_modal">
      <div class="confirm_modal_background"></div>
      <div class="confirm_modal">
        <div class="big-content-wrapper">
          <div class="confirm_modal_title">{{ $t("profile.confirm-end-stream")}}</div>
          <div class="end_stream_actions">
            <div class="end_stream_confirm">{{ $t("profile.end-stream")}}</div>
            <div @click="showModal = false" class="cancel_end_stream">{{ $t("profile.cancel")}}</div>
          </div>
          <div class="end_stream_fail_message"></div>
        </div>
      </div>
    </div>
    <div v-if="streamer" class="streaming_area">
      <div class="section_center">
        <div class="stream_center_top">
          <div v-if="streamer" class="stream_owner">
            <!-- <img class="streamer_profile_icon" :src="getProfileIcon" /> -->
            <p class="streamer_first_name">{{streamer.firstname || streamer.username}}</p>
            <p
              v-if="streamer.firstname && streamer.lastname"
              class="streamer_last_name"
            >{{ streamer.lastname }}</p>
          </div>
        </div>
        <div class="streamer_profile_container">
          <div class="streamer_stats">
            <img
              v-if="streamer.profile_image_url"
              class="streamer_profile_image"
              :src="streamer.profile_image_url"
            />
            <router-link
              to="/settings"
              v-if="!streamer.profile_image_url && user._id == streamer._id"
              class="add_about_section"
            >{{$t("profile.add-profile-pic")}}</router-link>
            <div
              @click="follow"
              v-if="!owner"
              class="streamer_follow_preview follow-profile"
              :class="{followingBg: userFollowing}"
            >
              <div class="streamer_follow_button">
                <img
                  class="streamer_follow_icon"
                  :src="userFollowing ? FollowingIcon  : FollowIcon"
                />
              </div>
              <div
                class="streamer_follow_state"
              >{{ userFollowing ? $t("watch.following") : $t("watch.follow") }}</div>
            </div>
            <div v-if="streamer" class="links">
              <a
                v-if="streamer.fb_link"
                :href="streamer.fb_link"
                class="social_link"
                target="_blank"
              >
                <img class="fb_link" src="../assets/images/facebook.png" />
              </a>
              <a
                v-if="streamer.insta_link"
                :href="streamer.insta_link"
                class="social_link"
                target="_blank"
              >
                <img class="insta_link" src="../assets/images/instagram.png" />
              </a>
              <a
                v-if="streamer.yt_link"
                :href="streamer.yt_link"
                class="social_link"
                target="_blank"
              >
                <img class="yt_link" src="../assets/images/youtube.png" />
              </a>
              <a
                v-if="streamer.twitter_link"
                :href="streamer.twitter_link"
                class="social_link"
                target="_blank"
              >
                <img class="insta_link" src="../assets/images/twitter.png" />
              </a>
              <a
                v-if="streamer.website_link"
                :href="streamer.website_link"
                class="social_link"
                target="_blank"
              >
                <img class="website_link" src="../assets/images/website.png" />
              </a>
            </div>
            <div v-if="streamer.description" class="streamer_about">
              <div class="streamer_about_title">{{$t("profile.about-streamer")}}</div>
              <div class="streamer_description">{{streamer.description}}</div>
              <router-link
                v-if="streamer.description && user._id == streamer._id"
                to="/settings"
                class="streamer_description_edit"
              >Edit</router-link>
            </div>
            <router-link
              to="/settings"
              v-if="!streamer.description && user._id == streamer._id"
              class="add_about_section"
            >{{$t("profile.add-about")}}</router-link>
            <div class="streamer_followings">
              <p
                class="streamer_count"
              >{{streamer.followers.length + " " + $t("profile.followers")}}</p>
              <p
                class="streamer_count"
              >{{streamer.following.length + " " + $t("profile.following")}}</p>
              <p
                class="streamer_count"
              >{{streamer.previous_streams.length + " " + $t("profile.streams-done")}}</p>
            </div>
          </div>
          <div class="streams_container">
            <p class="upcoming_streams_title">{{$t("profile.next-streams")}}</p>
            <div class="upcoming_streams_container">
              <div v-if="streamer.upcoming_streams.length" class="upcoming_streams">
                <ProfileStream
                  v-for="stream in streamer.upcoming_streams"
                  :key="stream._id"
                  :stream="stream"
                />
              </div>
              <div v-else class="no_upcoming_streams">
                <div class="no_streams_text">{{$t("profile.no-streams")}}</div>
              </div>
            </div>
            <p
              v-if="streamer.previous_streams.length"
              class="previous_streams_title"
            >Previous streams</p>
            <div class="previous_streams_container">
              <div class="previous_streams">
                <ProfileStream
                  v-for="stream in streamer.previous_streams"
                  :key="stream._id"
                  :stream="stream"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section_right"></div>
    </div>
  </div>
</template>

<script>
import auth from "../config/auth";
import axios from "axios";
import profileIcon from "../assets/images/profile_icon.png";
import ProfileStream from "../components/ProfileStream";
import FollowingIcon from "../assets/images/following_icon.png";
import FollowIcon from "../assets/images/follow_icon.png";

export default {
  name: "Profile",
  data() {
    return {
      showModal: false,
      streamer: null,
      stream: null,
      hostName: null,
      FollowingIcon,
      FollowIcon,
      userFollowing: null,
      isAuthenticated: false,
    };
  },
  components: {
    ProfileStream
  },
  mounted() {
    if (auth.isAuthenticated()) {
      this.isAuthenticated = true;
    }
    this.getStream();
  },
  methods: {
    async getStream() {
      const { data } = await axios.get(
        `/profile/user/${this.$route.params.id}`
      );
      this.stream = data.stream;
      this.streamer = data.streamer;
      this.hostName = data.host_name;
      this.userFollowing = data.user_following_boolean;
    },
    follow() {
      if (!auth.isAuthenticated()) {
        return alert(this.$t("profile.make-account"))
      }
      this.userFollowing = !this.userFollowing;
      axios.post(`/streams/${this.streamer._id}/followUnfollow`);
    },  
  },
  computed: {
    getProfileIcon() {
      if (this.streamer.profile_image_url) {
        return this.streamer.profile_image_url;
      }
      return profileIcon;
    },
    user() {
      return auth.isAuthenticated();
    },
    owner() {
      return this.streamer._id === auth.isAuthenticated()._id;
    },
  },
  watch: {
    $route() {
      this.streamer = null;
      this.getStream();
    }
  }
};
</script>

<style>
/*----------------------
  About streamer
----------------------*/

.follow-profile {
    margin-top: 10px;
    padding: 6px 15px;
    font-size: 16px;
    margin-bottom: 10px;
    margin-right: unset;
    margin-left: unset;
}

.no_previous_streams,
.no_upcoming_streams {
  padding: 24px;
  font-size: 22px;
  font-weight: bold;
  color: #444;
  background-color: #f7f7f7;
  border-radius: 4px;
  height: 250px;
}

.no_upcoming_streams {
  width: 600px;
  margin-left: 20px;
  margin-top: 15px;
  border-radius: 3px;
}

.fb_link,
.twitter_link,
.yt_link,
.insta_link,
.website_link {
  height: 25px;
}

.social_link {
  display: inline-block;
  margin-right: 4px;
  margin-top: 2px;
  padding: 2px 4px;
  border-radius: 4px;
}

.social_link:hover {
  background-color: #eee;
}

.streamer_description {
  margin-left: 5px;
  line-height: 21px;
}

.streamer_description_edit {
  margin-top: 12px;
  padding: 5px 16px;
  font-size: 17px;
  display: inline-block;
  background-color: #e4e4e4;
  border-radius: 3px;
  margin-right: 15px;
  text-align: center;
  transition: 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  font-weight: bold;
  margin-left: 130px;
}

.streamer_description_edit:hover {
  background-color: #eee;
}

.add_about_section,
.add_profile_image_section {
  padding: 23px 20px;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 200px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  display: block;
}

.add_about_section:hover,
.add_profile_image_section:hover {
  background-color: #f1f1f1;
}

.streams_container {
  margin-left: 80px;
}

.profile {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

/*! CSS Used from: https://www.eeter.tv/css/reset.css */
div,
iframe,
p,
a,
img {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/*! CSS Used from: https://www.eeter.tv/css/main.css */
* {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
a {
  color: #333;
  text-decoration: none;
}
p {
  white-space: normal;
}
div,
p {
  display: block;
}
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100%;
  min-height: calc(100vh - 116px);
}
.confirm_modal {
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
.confirm_modal {
  width: 400px;
  padding: 25px;
}
.big-content-wrapper {
  margin: auto;
  margin-top: 20px;
}
.confirm_modal_background {
  background-color: #1f1f1f;
  opacity: 0.5;
  top: 0;
  z-index: 1003;
  position: fixed;
  width: 100%;
  height: 100%;
}
.cancel_end_stream {
  padding: 7px 11px;
  transition: 0.2s ease-in-out;
  margin: auto 0px auto auto;
  font-size: 18px;
}
.cancel_end_stream:hover {
  background-color: #ececec;
  border-radius: 360px;
  cursor: pointer;
}
.cancel_end_stream {
  float: right;
}
.donate_button {
  background-color: #130088;
  padding: 11px 15px;
  margin-left: auto;
  margin-right: 80px;
  color: #FF9800;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s ease;
}
.donate_button:hover {
  opacity: 0.8;
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.streaming_area {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex;
}
.streamer_first_name,
.streamer_last_name {
  font-size: 27px;
  display: inline;
  margin-right: 5px;
}
.live_player {
  border-radius: 10px;
}
.stream_owner {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 15px;
}
.stream_owner:hover {
  background-color: #f7f7f7;
}
.stream_center_top {
  display: flex;
  align-items: center;
  max-width: 865px;
}
.streamer_about {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.streamer_about_title {
  font-size: 22px;
  padding: 5px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.streamer_profile_image {
  display: block;
  margin-bottom: 6px;
  height: 240px;
  width: 240px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  border-radius: 4px;
  object-fit: cover;
}
.streamer_profile_icon {
  height: 45px;
  min-height: 45px;
  margin-right: 10px;
  width: 45px;
  min-width: 45px;
  border-radius: 360px;
  object-fit: cover;
}
.streamer_upcoming {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 200px;
  margin-top: 20px;
}
.streamer_followings {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 200px;
  margin-top: 20px;
}
.streamer_count {
  padding: 5px;
  font-weight: bold;
  color: #333;
  font-size: 19px;
  margin-bottom: 10px;
}
.streamer_profile_container {
  margin-top: 14px;
  margin-bottom: 50px;
  display: flex;
}
.upcoming_streams_container {
  align-items: center;
  display: flex;
  height: auto;
  flex: 1;
  overflow-y: auto;
  width: 900px;
  margin-bottom: 40px;
}
.previous_streams_container {
  width: 900px;
}
.previous_streams,
.upcoming_streams {
  width: 900px;
  box-sizing: border-box;
  /* padding: 20px; */
  padding-top: 0px;
  border-radius: 4px;
}
.upcoming_streams {
  display: flex;
  padding: 10px 0px;
}

.previous_streams {
  display: flex;
  flex-wrap: wrap;
}

.previous_streams_title,
.upcoming_streams_title {
  padding: 5px;
  font-weight: bold;
  color: #333;
  font-size: 45px;
  padding-left: 24px;
}

.previous_stream,
.upcoming_stream {
  margin-top: 40px;
  padding: 20px;
  padding-bottom: 10px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  border-radius: 4px;
}
.upcoming_stream {
  margin: 0 15px;
  min-width: 250px;
  max-width: 350px;
  font-size: 22px;
  font-weight: bold;
  color: #444;
  background-color: #f7f7f7;
  border-radius: 4px;
  height: 250px;
  padding: 24px;
}
.previous_stream_details,
.upcoming_stream_details {
  display: flex;
  align-items: center;
  padding: 5px 10px 16px 1px;
}
.stream_title {
  font-size: 24px;
}
.stream_title:hover {
  color: #888;
}
.stream_date {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}
/*! CSS Used from: https://www.eeter.tv/css/modal.css */
.big-content-wrapper {
  margin: auto;
  margin-top: 20px;
}
.confirm_modal_title {
  font-size: 24px;
  margin-bottom: 45px;
}
.end_stream_actions {
  display: flex;
  align-items: center;
}
.end_stream_confirm {
  /* width: 165px; */
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 2px;
  padding: 10px 16px;
  margin: 20px 12px 55px 0px;
  box-sizing: border-box;
  color: #333;
  font-weight: 500;
  font-size: 23px;
  display: inline-block;
  margin-bottom: 0px;
  margin-left: auto;
  display: block;
}
.end_stream_confirm:hover {
  background-color: #e8e8e8 !important;
}
.end_stream_confirm {
  margin: unset;
}
.end_stream_fail_message {
  display: none;
  color: red;
  margin-top: 15px;
  margin-left: 5px;
}
</style>