<template>
    <div class="manager">Video Manager
    <p>Manage all your videos from here. Quickly go live or end streams.</p>
    <!-- all upcoming, current & new streams, old ones in other tab-->
    <StreamBar v-for="stream in streams" :key="stream._id" :stream="stream" />
    </div>
</template>

<script>
import axios from "axios";
import StreamBar from "../components/StreamBar";

export default {
  name: "VideoManager",
  data() {
    return {
      streams: {}
    };
  },
  components: {
    StreamBar,
  },
  async mounted() {
    const { data } = await axios.get('/dashboard/streams');
    this.streams = data.streams;
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