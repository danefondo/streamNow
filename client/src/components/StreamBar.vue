<template>
  <div class="stream all" v-if="activetab === 'all' || activetab == getStreamState(stream)">
    <div class="streamPreviewContainer">
      <img class="streamPreview" :src="thumbnail" />
      <div v-if="stream.is_scheduled" class="streamDateTime mobileSize">
        <div v-if="stream.is_scheduled" class="streamDateMeta">
          <div class="streamDate">{{ getStreamDate(stream) + ' /'}}</div>
        </div>
        <div v-if="stream.is_scheduled" class="streamTimeMeta">
          <div class="streamTime">{{ getStreamTime(stream) }}</div>
        </div>
      </div>
      <div class="live"></div>
      <div class="viewerCount"></div>
    </div>
    <div class="streamMetaContainer">
      <div class="streamNameContainer">
        <router-link
          :to="'/watch/'+stream._id"
          class="streamName"
        >{{stream.stream_name || "Untitled stream"}}</router-link>
      </div>
      <div v-if="stream.is_scheduled" class="streamDateTime desktopSize">
        <div v-if="stream.is_scheduled" class="streamDateMeta">
          <div class="streamDate">{{ getStreamDate(stream) + ' /'}}</div>
        </div>
        <div v-if="stream.is_scheduled" class="streamTimeMeta">
          <div class="streamTime">{{ getStreamTime(stream) }}</div>
        </div>
      </div>
      <div class="streamTags">
        <div v-for="(tag, index) in stream.stream_tags" :key="index" class="streamTag">{{tag}}</div>
      </div>
      <div class="stream-controller">
        <div v-if="stream.is_live" class="is_live">{{$t("watch.live")}}</div>
        <div
          v-if="!stream.is_live && !stream.is_scheduled"
          class="is_previous"
        >{{$t("watch.previous")}}</div>
        <div
          @click="$emit('initiateGoLive', stream._id)"
          v-if="stream.is_scheduled"
          class="take_live"
        >{{$t("streamManager.go-live")}}</div>
        <div @click="editStream" class="edit_stream">{{$t("streamManager.edit")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import profileIcon from "../assets/images/profile_icon.png";

export default {
  name: "StreamBar",
  props: ["stream", "activetab"],
  computed: {
    thumbnail() {
      if (this.stream.thumbnail_url) {
        return this.stream.thumbnail_url;
      }
      return `https://img.youtube.com/vi/${this.stream.stream_video_id}/hqdefault.jpg`;
    },
    profileImage() {
      if (this.stream.streamer.profile_image_url) {
        return this.stream.streamer.profile_image_url;
      }
      return profileIcon;
    }
  },
  methods: {
    getStreamTime(stream) {
      let time;
      if (stream.is_scheduled && stream.scheduled_time) {
        time = stream.scheduled_time;
        time = new Date(time);
        const options = { hour: "2-digit", minute: "2-digit" };
        time = time.toLocaleTimeString("et-EE", options);
      }
      return time;
    },
    getStreamDate(stream) {
      let time;
      if (stream.is_scheduled && stream.scheduled_time) {
        time = stream.scheduled_time;
        time = new Date(time);
        const options = { month: "long", day: "numeric" };
        time = time.toLocaleDateString("et-EE", options);
      }
      return time;
    },
    getStreamState(stream) {
      if (stream.is_live) {
        return "live";
      } else if (stream.is_scheduled) {
        return "upcoming";
      } else {
        return "previous";
      }
    },
    editStream() {
      this.$router.push(`/edit/${this.stream._id}?manage=1`);
    }
  }
};
</script>

<style scoped>
.streamDateTime {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 285px;
  background-color: transparent;
  margin-bottom: 14px;
  height: 35px;
}

.streamDateTime .streamTimeMeta,
.streamDateTime .streamDateMeta {
  height: 35px;
  background-color: #f5f6fb;
  position: unset;
}

.streamDateTime .streamTime,
.streamDateTime .streamDate {
  font-size: 19px;
}

.streamDateTime .streamDate {
  padding: 9px 10px 9px 15px;
}

.streamDateTime .streamTime {
  padding: 9px 15px 9px 0px;
}

.stream {
  width: 800px;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 10px;
  position: relative;
  cursor: default;
}

.streamName:hover {
  text-decoration: underline;
}

.streamPreviewContainer {
  position: relative;
  min-width: 225px;
  width: 225px;
  height: 152px;
}

.streamMetaContainer {
  padding: 2px 10px 5px 24px;
  width: 100%;
  max-width: 100%;
}

img.streamPreview {
  min-height: 152px;
}

.streamTimeMeta,
.streamDateMeta {
  height: 48px;
  /* background-color: #fbfbfb; */
  background-color: transparent;
  /* z-index: 9999; */
  width: auto;
  position: absolute;
  top: 20px;
  right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 3px 2px 11px 0px rgba(10, 0, 70, 0.42); */
}

.streamDateMeta {
  right: 100px;
}

.streamTime,
.streamDate {
  padding: 11px 15px;
  font-weight: bold;
  font-size: 21px;
  color: #f4f3ff;
  color: #292295;
}

.stream-controller {
  margin-top: 41px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
}

.edit_stream,
.is_live,
.take_live,
.is_previous {
  padding: 10px 16px;
  padding-top: 11px;
  font-size: 17px;
  display: inline-block;
  background-color: #f7f7f7;
  border-radius: 3px;
  margin-right: 15px;
  text-align: center;
  transition: 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  font-weight: bold;
  width: 100px;
}
.edit_stream:hover,
.take_live:hover {
  color: #aaa;
}

.take_live {
  background-color: #130089;
  color: white;
}

.is_live {
  color: darkred;
  background-color: transparent;
  width: 50px;
  cursor: default;
}

.is_previous {
  cursor: default;
  background-color: transparent;
}
</style>