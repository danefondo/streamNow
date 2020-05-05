<template>
  <div v-if="streams.length" class="manager">
    <div v-if="showGoLiveModal" class="goLiveModal">
      <div @click="cancelModal" class="goLiveModalBackground"></div>
      <div class="toLiveModal">
        <div class="modal-content-wrapper">
          <div class="modal-text-container">
            <div class="modal-title">{{ $t("streamManager.confirm-go-live") }}</div>
            <div class="modal-body">{{ $t("streamManager.confirm-go-live") }}</div>
          </div>
          <div class="action-group">
            <div
              @click="cancelModal"
              class="cancelPermaDeleteAccount button-outline"
            >{{ $t("streamManager.cancel-go-live") }}</div>
            <div
              @click="goLive"
              class="confirm-golive button-filled"
            >{{ $t("streamManager.go-live") }}</div>
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
      >{{ $t("streamManager.all") }}</div>
      <div
        @click="activetab='upcoming'"
        class="manager-option"
        v-bind:class="[ activetab === 'upcoming' ? 'manager-selected' : '' ]"
      >{{ $t("streamManager.upcoming") }}</div>
      <div
        @click="activetab='previous'"
        class="manager-option"
        v-bind:class="[ activetab === 'previous' ? 'manager-selected' : '' ]"
      >{{ $t("streamManager.previous") }}</div>
      <div
        @click="activetab='live'"
        class="manager-option"
        v-bind:class="[ activetab === 'live' ? 'manager-selected' : '' ]"
      >{{ $t("streamManager.live") }}</div>
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
      streamToGoLive: null
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
        this.$emit("updateLive", true, this.streamToGoLive);
        this.$router.push(`/watch/${this.streamToGoLive}`);
      } catch (error) {
        alert(error.response.data.errors);
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

.goLiveModalBackground {
  background-color: #1f1f1f;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 1003;
  position: fixed;
  width: 100%;
  height: 100%;
}

.toLiveModal {
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

.confirm-golive {
  margin-right: 12px;
  background-color: #0000ff94;
}

.button-filled {
  display: inline-block;
  font-weight: 600;
  color: white;
  letter-spacing: 0.1rem;
  background-color: #130089;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  padding: 12px;
  text-align: center;
  transition: 0.2s ease;
}
.button-filled:hover {
  background-color: #0000ff94;
}

.modal-text-container {
  width: 250px;
}

.modal-content-wrapper {
  width: 290px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.modal-title {
  margin-top: 30px;
  font-size: 20px;
  width: 250px;
}
.modal-body {
  padding-top: 10px;
  font-weight: 100;
  font-size: 16px;
  display: block;
  width: 250px
}
</style>