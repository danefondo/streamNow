<template>
  <NoScheduledStreams v-if="!loading && !Object.keys(streams).length" />
  <div v-else class="contentArea">
    <div v-if="!isAuthenticated" class="registration-block">
      <div class="title__landingPage cd-words-wrapper">
        <div class="landingTitleP1">{{$t("home.landing-title-core")}}</div>
        <div class="landingTitleP2">{{$t("home.landing-title-changing-1")}}</div>
        <div class="landingSubtitle">{{$t("home.subtitle")}}</div>
      </div>
      <router-link to="/register" class="signupPageLink">{{$t("home.join")}}</router-link>
    </div>

    <div class="discovery_section">
      <div class="examplesSection__landingPage">
        <div class="examplesContainer__landingPage">
          <div
            v-if="!loading && featured"
            class="examplesTitle__landingPage"
          >{{ weLive ? $t('scheduled.live_now') : $t('scheduled.next-up') }}</div>
        </div>
      </div>
      <Featured v-if="weLive" :featured="liveNow" />
      <Featured v-else-if="featured" :featured="featured" />
    </div>
    <div class="discovery_section">
      <div class="examplesSection__landingPage">
        <div class="examplesContainer__landingPage">
          <div v-if="!loading" class="examplesTitle__landingPage">{{ $t('scheduled.caption') }}</div>
        </div>
      </div>
      <div class="streams">
        <div class="dateGroups">
          <div class="dateGroup" v-for="(eachDateGroup, eachDate) in streams" :key="eachDate">
            <div class="dateGroupTitle">{{ eachDate }}</div>
            <div class="streamGroup">
              <Stream
                v-for="eachStream in eachDateGroup"
                :key="eachStream._id"
                :stream="eachStream"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="discovery_section">
      <div class="examplesSection__landingPage">
        <div class="examplesContainer__landingPage">
          <div v-if="!loading" class="examplesTitle__landingPage">{{ $t('scheduled.watch-again') }}</div>
        </div>
      </div>
      <div class="streams">
        <div class="streamGroup">
          <Stream v-for="stream in pastStreams" :key="stream._id" :stream="stream" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../config/auth";
import Featured from "../components/Featured";
import Stream from "../components/Stream";
import NoScheduledStreams from "../components/NoScheduledStreams";

export default {
  name: "Scheduled",
  data() {
    return {
      featured: null,
      streams: {},
      liveStreams: {},
      pastStreams: {},
      loading: true,
      isAuthenticated: false,
      liveNow: null,
      weLive: false
    };
  },
  components: {
    Stream,
    Featured,
    NoScheduledStreams
  },
  async mounted() {
    if (auth.isAuthenticated()) {
      this.isAuthenticated = true;
    }
    try {
      const { data } = await axios.get(`/streams?scheduled=true`);
      // this.featured = data.featured;
      this.featured = data.streams[0];
      this.loading = false;
      data.streams.forEach(eachStream => {
        const options = { weekday: "long", month: "long", day: "numeric" };
        let date = new Date(eachStream.scheduled_time).toLocaleDateString(
          "et-EE",
          options
        );
        if (!this.streams[date]) {
          this.streams[date] = [];
        }
        this.streams[date].push(eachStream);
      });
    } catch (error) {
      this.loading = false;
    }
    try {
      const { data } = await axios.get(`/streams/fetchLiveStreams`);
      this.liveStreams = data.streams;
      this.liveNow = data.streams[0];
      this.weLive = true;
    } catch (error) {
      this.loading = false;
    }
    try {
      let sendData = {
        date: new Date()
      };
      const { data } = await axios.post(`/streams/fetchPastStreams`, sendData);
      this.pastStreams = data.streams;
      console.log("past", this.pastStreams);
    } catch (error) {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.featured_streamer_description_container_discover span,
.scheduled_stream_description span {
    background-color: transparent !important;
    color: inherit !important;
}

.stream {
  padding-top: 20px;
}

.streamGroup {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.dateGroups {
  margin-top: 40px;
}

.dateGroup {
  padding-bottom: 20px;
}

.dateGroupTitle {
  text-transform: capitalize;
  margin-left: 30px;
  font-size: 36px;
  font-weight: 600;
  color: #120088e3;
}
</style>
