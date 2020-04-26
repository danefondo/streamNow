<template>
  <div class="contentArea">
    <div class="examplesSection__landingPage">
      <div class="examplesContainer__landingPage">
        <div class="examplesTitle__landingPage">{{ $t('home.caption') }}</div>
      </div>
    </div>
    <Featured v-if="featured" :featured="featured" />
    <div class="streams">
      <Stream v-for="eachStream in streams" :key="eachStream._id" :stream="eachStream" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stream from "../components/Stream";
import Featured from "../components/Featured";

export default {
  name: "Home",
  data() {
    return {
      featured: null,
      streams: []
    };
  },
  components: {
    Stream,
    Featured
  },
  async mounted() {
    const { data } = await axios.get('/streams');
    this.featured = data.featured;
    this.streams = data.streams;
  }
};
</script>
