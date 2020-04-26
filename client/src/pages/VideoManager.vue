<template>
    <div class="manager">Video Manager
    <p>Manage all your videos from here. Quickly go live or end streams.</p>
    <!-- all upcoming, current & new streams, old ones in other tab-->
    <StreamBar v-for="eachStream in eachDateGroup" :key="eachStream._id" :stream="eachStream" />
    </div>
</template>

<script>
import axios from "axios";
import { BASE_PATH } from "../constants";
import StreamBar from "../components/StreamBar";

export default {
  name: "VideoManager",
  data() {
    return {
      streams: {},
      loading: true,
    };
  },
  components: {
    StreamBar,
  },
  async mounted() {
    const { data } = await axios.get(
      `${BASE_PATH}/streams?scheduled=true`
    );
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

<style>

.manager {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}

</style>