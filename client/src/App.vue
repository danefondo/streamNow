<template>
  <div>
    <Nav :isAuthenticated="isAuthenticated" :user="user" />
    <div class="container">
      <router-view @updateLive="updateLive" @update="update"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import { setAuth } from "./config/axios";
import auth from "./config/auth";

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
      user: {}
    };
  },
  components: {
    Nav,
    Footer
  },
  mounted() {
    if (auth.isAuthenticated()) {
      this.user = auth.isAuthenticated();
      this.isAuthenticated = true;
    }
  },
  methods: {
    update(details) {
      if (details.token) {
        setAuth(details.token, false);
        if (details.user.is_live) {
          localStorage.isLive = details.user.is_live;
          localStorage.active_stream_id = details.user.active_stream_id;
        }
        this.isAuthenticated = true;
      }
      this.user = details.user;
    },
    updateLive(status, streamId) {
      if (!status) {
        localStorage.removeItem('isLive')
        localStorage.removeItem('active_stream_id')
        this.user.is_live = false;
        this.user.active_stream_id = "";
      } else {
        localStorage.isLive = status;
        localStorage.active_stream_id = streamId;
        this.user.is_live = status;
        this.user.active_stream_id = streamId;
      }
      
    }
  }
};
</script>
