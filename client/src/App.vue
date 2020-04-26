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
        localStorage.isLive = details.user.is_live;
        this.isAuthenticated = true;
      }
      this.user = details.user;
    },
    updateLive(status) {
      if (!status) {
        localStorage.removeItem('isLive')
      } else {
        localStorage.isLive = status;
      }
      this.user.is_live = status;
    }
  }
};
</script>
