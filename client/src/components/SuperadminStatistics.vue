<template>
  <div class="stream all statistics" v-if="activetab === 'statistics'">
    <div class="streamMetaContainer">
      <div class="streamerEmailContainer">
        <div class="userStatistics">User statistics</div>
        <div class="streamerEmail">{{users.length}} registered users</div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "SuperadminStatistics",
  props: ["users", "activetab"]

};
</script>

<style scoped>
.userStatistics {
    font-size: 30px;
    margin-bottom: 10px;
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
  height: 152px !important;
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
  z-index: 9999;
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