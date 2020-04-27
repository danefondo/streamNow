<template>
  <div class="nav-container auto-side-margins">
    <div class="navlinks-container">
      <router-link
        to="/about"
        :class="[checkActive('about'), 'topNavigationLink__topBar']"
      >{{$t("footer.about")}}</router-link>
      <router-link
        to="/privacy"
        :class="[checkActive('privacy'), 'topNavigationLink__topBar']"
      >{{$t("footer.privacy")}}</router-link>
      <router-link
        to="/terms"
        :class="[checkActive('terms'), 'topNavigationLink__topBar']"
      >{{$t("footer.terms")}}</router-link>
      <router-link
        to="/contact"
        :class="[checkActive('contact'), 'topNavigationLink__topBar']"
      >{{$t("footer.contact")}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutNav",
  // data() {
  //     return {
  //         isActive: 'active-about',
  //     };
  // },
  // computed: {
  //     currentPage() {
  //         return this.$route.path;
  //     }
  // },
  methods: {
    checkActive(page) {
      return this.$route.path.includes(page) ? 'active-about' : ''
    }
  }
};
</script>
