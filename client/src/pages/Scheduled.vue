<template>
  <div class="contentArea">
    <div class="discovery_section">
      <div class="examplesSection__landingPage">
        <div class="examplesContainer__landingPage">
          <div v-if="!loading" class="examplesTitle__landingPage">
            {{ featured.is_live ? $t('scheduled.live_now') : $t('scheduled.next_up') }}</div>
        </div>
      </div>
      <Featured v-if="featured" :featured="featured" />    
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
              <Stream v-for="eachStream in eachDateGroup" :key="eachStream._id" :stream="eachStream" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Featured from "../components/Featured";
import { BASE_PATH } from "../constants";
import Stream from "../components/Stream";

export default {
  name: "Scheduled",
  data() {
    return {
      featured: null,
      streams: {},
      loading: true,
    };
  },
  components: {
    Stream,
    Featured
  },
  async mounted() {
    const { data } = await axios.get(
      `${BASE_PATH}/streams?scheduled=true`
    );
    this.featured = data.featured;
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
  }
};
</script>

<style scoped>
.stream {
  padding-top: 20px;
}

.streamGroup {
  display: flex;
  flex-direction: row;
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
