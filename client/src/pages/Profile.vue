<template>
  <div class="profile">
    <div v-if="showModal" class="confirm_end_modal">
      <div class="confirm_modal_background"></div>
      <div class="confirm_modal">
        <div class="big-content-wrapper">
          <div class="confirm_modal_title">Confirm end stream?</div>
          <div class="end_stream_actions">
            <div class="end_stream_confirm">End stream</div>
            <div @click="showModal = false" class="cancel_end_stream">Cancel</div>
          </div>
          <div class="end_stream_fail_message"></div>
        </div>
      </div>
    </div>
    <div class="user_check" data-user-id="5e770037c84aaa1088d5315c"></div>
    <div v-if="stream" class="streaming_area">
      <div class="section_center">
        <div class="stream_center_top">
          <div v-if="stream.streamer" class="stream_owner">
            <img class="streamer_profile_icon" src="https://curata.s3.amazonaws.com/1586454443289" />
            <p
                class="streamer_first_name"
            >{{stream.streamer.firstname || stream.streamer.username}}</p>
            <p
                v-if="stream.streamer.firstname && stream.streamer.lastname"
                class="streamer_last_name"
            >{{ stream.streamer.lastname }}</p>
          </div>
          <div class="donate_button">Support $</div>
        </div>
        <div class="streamer_profile_container">
          <div class="streamer_stats">
            <img class="streamer_profile_image" src="https://curata.s3.amazonaws.com/1586454443289" />
            <div v-if="stream.streamer" class="links">
              <a :href="stream.streamer.fb_link">
                <img class="fb_link social_link" src="../assets/images/facebook.png" />
              </a>
              <img class="website_link social_link" />
            </div>
            <div class="streamer_about">
              <div class="streamer_about_title">About streamer</div>
              <div class="streamer_description">I make code.</div>
              <div class="streamer_description_edit">Edit</div>
            </div>
            <div class="streamer_followings">
              <p class="streamer_count">2 Followers</p>
              <p class="streamer_count">1 Following</p>
              <p class="streamer_count">9 Streams done</p>
            </div>
            <div class="streamer_upcoming">
              <div class="upcoming">No upcoming streams planned</div>
            </div>
          </div>
          <div class="streams_container">
            <p class="upcoming_streams_title">Upcoming streams</p>
            <div class="upcoming_streams_container">
              <div class="upcoming_streams">
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9845ee972cc0581d6d5453">ewrwe</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9eb90b891f2117d45cb4e3">MonkeyTime</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9f66cd1859bd34051e278d">test</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9f6767c24b1a344b8463ad">test</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9f695db176313541147860">Untitled stream</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9f6f52a8bb7337c3ae117b">testt</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a
                      class="stream_title"
                      href="/watch/5e9f6f64a8bb7337c3ae117c"
                    >Learn How To Create Your Own Workout Routine</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5e9f6f77a8bb7337c3ae117d">3333</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a
                      class="stream_title"
                      href="/watch/5ea22f4c1aad0f00175e72c6"
                    >How To Setup Your Morning Routine</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5ea34e7b7b9ea8001745a54e">StreamTtest</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5ea363487b9ea8001745a550">sddsfds</a>
                  </div>
                </div>
                <div class="upcoming_stream">
                  stream
                  <div class="upcoming_stream_details">
                    <a class="stream_title" href="/watch/5ea36d8a7b9ea8001745a553">test</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="previous_streams_container">
              <div class="previous_streams">
                <p class="previous_streams_title">Previous streams</p>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5e8f5b0148648600177ab1e6">Let us do It Live</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/Ue0xaq1Q-B4?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5e9124065dba2d839418b4f8">Mr Bean Is Back!</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/Ue0xaq1Q-B4?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5e91549106b7600017cf416b">Space Stream</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/EEIk7gwjgIM?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a
                      class="stream_title"
                      href="/watch/5e91af6d59bf610017585fa0"
                    >Let's Do Yoga Together!</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/RUToCjzmxVM?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a
                      class="stream_title"
                      href="/watch/5e91b4bae1f5d900174e89f7"
                    >Let's Do Yoga Together!</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/RUToCjzmxVM?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5e9f12f1e088b609cb876db5">dfdfgdg</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/egdgrgt349?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5ea34e7b7b9ea8001745a54e">StreamTtest</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/test?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5ea363487b9ea8001745a550">sddsfds</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/sdfsdfsdf?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="previous_stream">
                  <div class="previous_stream_details">
                    <a class="stream_title" href="/watch/5ea36d8a7b9ea8001745a553">test</a>
                    <div class="stream_date">April 4</div>
                  </div>
                  <iframe
                    class="live_player"
                    width="550"
                    height="331"
                    src="https://www.youtube-nocookie.com/embed/test?modestbranding=1&amp;showinfo=0&amp;rel=0&amp;theme=light&amp;color=white"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
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
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      showModal: false,
      streamer: null,
      stream: null,
      hostName: null,
    };
  },
  mounted() {
    this.getStream();
  },
  methods: {
    async getStream() {
      const { data } = await axios.get(`/profile/${this.$route.params.id}`);
      this.stream = data.stream;
      this.streamer = data.streamer;
      this.hostName = data.host_name;
    }
  }
};
</script>

<style>
.social_link {
  height: 25px;
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
  min-height: calc(100vh - 105px);
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
  background-color: #1b9a6b;
  padding: 11px 15px;
  margin-left: auto;
  margin-right: 80px;
  color: white;
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
  font-size: 22px;
  display: inline;
  margin-right: 5px;
}
.live_player {
  border-radius: 10px;
}
.stream_owner {
  display: flex;
  align-items: center;
}
.stream_center_top {
  display: flex;
  align-items: center;
  max-width: 865;
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
  margin-bottom: 30px;
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
  margin-right: 10px;
  width: 45px;
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
}
.streamer_count {
  padding: 5px;
  font-weight: bold;
  color: #333;
  font-size: 19px;
  margin-bottom: 10px;
}
.streamer_profile_container {
  margin-top: 80px;
  margin-bottom: 50px;
  display: flex;
}
.upcoming_streams_container {
  margin-left: 30px;
  align-items: center;
  display: flex;
  height: auto;
  flex: 1;
  margin: 0 0 0 30px;
  overflow-y: auto;
  width: 630px;
}
.previous_streams_container {
  margin-left: 30px;
  margin-top: 40px;
}
.previous_streams,
.upcoming_streams {
  width: 630px;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 0px;
  border-radius: 4px;
}
.upcoming_streams {
  display: flex;
}
.previous_streams_title,
.upcoming_streams_title {
  padding: 5px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  font-size: 32px;
}
.upcoming_streams_title {
  margin-left: 30px;
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
  width: 165px;
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