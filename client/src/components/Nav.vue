<template>
  <div class="nav-container" :class="isAuthenticated ? 'authNav' : 'notAuthNav'">
    <div class="title-container">
      <router-link class="title-btn" to="/">eeter.tv</router-link>
    </div>
    <div class="navlinks-container">
      <router-link
        class="topNavigationLink__topBar desktopSize"
        to="/scheduled"
      >{{$t("nav.scheduled")}}</router-link>
      <!-- <router-link class="topNavigationLink__topBar" to="/discover">Avasta</router-link> -->
      <template v-if="isAuthenticated">
        <div class="stream_buttons desktopSize">
          <router-link
            v-if="user.is_live && user.active_stream_id"
            class="go_live_button isOnAir"
            :to="'/watch/' + user.active_stream_id"
          >{{ $t("nav.is-live") }}</router-link>
          <router-link
            v-if="!user.is_live"
            class="go_live_button goOnAir"
            to="/golive"
          >{{ $t("nav.go-live") }}</router-link>
        </div>
        <div class="logout-container" :class="isAuthenticated ? 'authProfile' : 'notAuthProfile'">
          <div
            ref="dropdown"
            @click="toggleDropdown()"
            class="DropdownX"
            :class="{'is-expanded': isOpened}"
          >
            <div class="Dropdown-profile">
              <div class="Photo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path
                    style="fill:#120088; text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans"
                    d="M 16 5 C 12.145852 5 9 8.1458513 9 12 C 9 14.408843 10.23116 16.55212 12.09375 17.8125 C 8.5266131 19.342333 6 22.881262 6 27 L 8 27 C 8 22.569334 11.569334 19 16 19 C 20.430666 19 24 22.569334 24 27 L 26 27 C 26 22.881262 23.473387 19.342333 19.90625 17.8125 C 21.76884 16.55212 23 14.408843 23 12 C 23 8.1458513 19.854148 5 16 5 z M 16 7 C 18.773268 7 21 9.2267317 21 12 C 21 14.773268 18.773268 17 16 17 C 13.226732 17 11 14.773268 11 12 C 11 9.2267317 13.226732 7 16 7 z"
                    color="#000"
                    overflow="visible"
                    font-family="Bitstream Vera Sans"
                  />
                </svg>
              </div>
              <div class="userId" id="5e770037c84aaa1088d5315c"></div>
            </div>
            <nav class="Dropdown-nav SettingsNav">
              <ul class="Dropdown-group">
                <li class="dropLive">
                  <router-link
                    class="entypo-newspaper NavLinkX"
                    to="/golive"
                  >{{ $t("nav.go-live") }}</router-link>
                  <a class="entypo-plus OptionLink" href="#"></a>
                </li>
                <li>
                  <router-link
                    class="entypo-newspaper NavLinkX"
                    :to="myProfile"
                  >{{$t("nav.profile")}}</router-link>
                  <a class="entypo-plus OptionLink" href="#"></a>
                </li>
                <li v-if="user.superadmin">
                  <router-link
                    class="entypo-archive NavLinkX"
                    to="/superadmin"
                  >{{$t("admin.superadmin")}}</router-link>
                  <a class="entypo-plus OptionLink" href="#"></a>
                </li>
                <li>
                  <router-link
                    class="entypo-archive NavLinkX"
                    to="/manage-streams"
                  >{{$t("nav.manage-streams")}}</router-link>
                  <a class="entypo-plus OptionLink" href="#"></a>
                </li>
                <li>
                  <router-link class="entypo-archive NavLinkX" to="/settings">{{$t("nav.settings")}}</router-link>
                  <a class="entypo-plus OptionLink" href="#"></a>
                </li>
                <li>
                  <a class="entypo-logout NavLinkX" @click="logout">{{$t("nav.logout")}}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="stream_buttons">
          <router-link
            class="go_live_button login-nav login-responsive"
            to="/login"
          >{{$t("nav.login")}}</router-link>
          <router-link class="go_live_button" to="/register">{{$t("nav.register")}}</router-link>
        </div>
      </template>
    </div>
    <div v-if="isAuthenticated" class="stream_buttons mobileSize">
      <router-link
        v-if="user.is_live && user.active_stream_id"
        class="go_live_button isOnAir"
        :to="'/watch/' + user.active_stream_id"
      >{{ $t("nav.is-live") }}</router-link>
      <router-link
        v-if="!user.is_live"
        class="go_live_button goOnAir"
        to="/golive"
      >{{ $t("nav.go-live") }}</router-link>
    </div>
  </div>
</template>

<script>
import auth from "../config/auth";

export default {
  name: "Nav",
  data() {
    return {
      isOpened: false
    };
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },
  computed: {
    myProfile() {
      return `/profile/${this.user._id}`;
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
    onClick(e) {
      const dropdownRef = this.$refs.dropdown;
      if (
        dropdownRef &&
        dropdownRef !== e.target &&
        !dropdownRef.contains(e.target) &&
        this.isOpened
      ) {
        this.toggleDropdown();
      }
    },
    logout() {
      auth.logout();
    }
  }
};
</script>

<style>
.dropLive {
  display: none;
  background-color: #130088;
  color: white;
  font-weight: 600;
  border-radius: 2px;
}

.mobileSize {
  display: none;
}

.DropdownX.is-expanded nav {
  visibility: visible;
  opacity: 1;
}
.navlinks-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.login-nav {
  color: #130088;
  background-color: transparent;
}

.login-nav:hover {
  background-color: #f5f5f5;
}
</style>
