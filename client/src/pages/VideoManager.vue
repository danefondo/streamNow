<template>
  <div v-if="streams.length" class="manager">
    <div v-if="showGoLiveModal" class="modal__deleteAccount">
      <div class="modalBackground__deleteAccount"></div>
      <div class="deleteModal">
        <div class="content-wrapper">
          <div class="msg-title">{{ $t("streamManager.confirm-go-live") }}</div>
          <div
            class="msg-body"
          >{{ $t("streamManager.delete-acc-confirm-desc") }}</div>
          <div class="action-group">
            <div @click="cancelModal" class="cancelPermaDeleteAccount button-outline">{{ $t("streamManager.cancel-go-live") }}</div>
            <div @click="goLive" class="confirmPermaDeleteAccount button-filled">{{ $t("streamManager.go-live") }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="manager-header">
      <h1 class="manager-title">{{ $t("streamManager.manager-title") }}</h1>
      <p class="manager-tagline">{{ $t("streamManager.manager-tagline") }}</p>
    </div>
    <div class="manager-switch">
      <div
        @click="activetab='all'"
        class="manager-option"
        v-bind:class="[ activetab === 'all' ? 'manager-selected' : '' ]"
      >All</div>
      <div
        @click="activetab='upcoming'"
        class="manager-option"
        v-bind:class="[ activetab === 'upcoming' ? 'manager-selected' : '' ]"
      >Upcoming</div>
      <div
        @click="activetab='previous'"
        class="manager-option"
        v-bind:class="[ activetab === 'previous' ? 'manager-selected' : '' ]"
      >Previous</div>
      <div
        @click="activetab='live'"
        class="manager-option"
        v-bind:class="[ activetab === 'live' ? 'manager-selected' : '' ]"
      >Live</div>
    </div>
    <!-- all upcoming, current & new streams, old ones in other tab-->
    <div v-if="streams.length" class="manager-streams">
      <StreamBar
        v-for="stream in streams"
        :key="stream._id"
        :stream="stream"
        :activetab="activetab"
        @initiateGoLive="initiateGoLive"
      />
    </div>
  </div>
  <ManagerNoStreams v-else />
</template>

<script>
import axios from "axios";
import StreamBar from "../components/StreamBar";
import ManagerNoStreams from "../components/ManagerNoStreams";

export default {
  name: "VideoManager",
  data() {
    return {
      streams: {},
      activetab: "all",
      showGoLiveModal: false,
      streamToGoLive: null,
    };
  },
  components: {
    StreamBar,
    ManagerNoStreams
  },
  async mounted() {
    // axios.get("/dashboard/golive");
    const { data } = await axios.get("/dashboard/streams");
    this.streams = data.streams;
  },
  methods: {
    makeSelected: function(event) {
      event.target.classList.add("manager-selected");
    },
    initiateGoLive(streamId) {
      this.streamToGoLive = streamId;
      this.showGoLiveModal = true;
    },
    async goLive() {
      try {
        await axios.post(`/streams/golive/${this.streamToGoLive}`);
        this.$emit("updateLive", this.streamToGoLive);
        this.$router.push(`/watch/${this.streamToGoLive}`);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    cancelModal() {
      this.streamToGoLive = null;
      this.showGoLiveModal = false;
    }
  }
};
</script>

<style>
.manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 60px;
}

.manager-header {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.manager-switch {
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
}

.manager-option {
  margin: 5px 9px;
  padding: 9px 18px;
  border-radius: 3px;
  min-width: 45px;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
}

.manager-option:hover {
  background-color: #f5f5f5;
}

.manager-initial {
  background-color: #f5f5f5;
}

.manager-selected {
  background-color: #f5f5f5;
}

.manager-title {
  font-size: 45px;
  margin-bottom: 10px;
}

.manager-tagline {
  font-size: 20px;
}
</style>