<template>
  <a class="upcoming_stream" :href="'/watch/'+stream._id">
    stream
    <div class="upcoming_stream_details">
      <router-link
        class="stream_title"
        :to="'/watch/' + stream._id"
      >{{stream.stream_name || "Untitled stream"}}</router-link>
    </div>
  </a>
</template>

<script>

export default {
  name: "UpcomingStream",
  props: ["stream"]
}
</script>

<style>

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

</style>