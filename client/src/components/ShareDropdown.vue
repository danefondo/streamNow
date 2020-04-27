<template>
  <div
    ref="dropdown"
    @click="toggleDropdown()"
    class="share_options"
    :class="{'is-expanded': isOpened}"
  >
    Share
    <nav class="Dropdown-nav SettingsNav">
      <ul class="Dropdown-group">
        <li>
          <a :href="buildFbShare" class="entypo-newspaper NavLinkX">Facebook</a>
          <a class="entypo-plus OptionLink" href="#"></a>
        </li>
        <li>
          <a :href="buildTwitterShare" class="entypo-archive NavLinkX">Twitter</a>
          <a class="entypo-plus OptionLink" href="#"></a>
        </li>
        <li>
          <div @click="copyLink()" class="entypo-archive NavLinkX">Link</div>
          <a class="entypo-plus OptionLink" href="#"></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "ShareDropdown",
  props: ["stream"],
  data() {
    return {
      isOpened: false
    };
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
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
    copyLink() {
        var input = document.createElement('textarea');
        input.innerHTML = window.location.href;
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    }
  },
  computed: {
    buildFbShare() {
      let currentBase = window.location.origin;
      console.log("cb", currentBase);
      let fbLink = `https://www.facebook.com/sharer/sharer.php?u=${currentBase}/watch/${this.stream._id}`;
      return fbLink;
    },
    buildTwitterShare() {
      let currentBase = window.location.origin;
      let twitterLink = `https://twitter.com/home?status=${currentBase}/watch/${this.stream._id}`;
      return twitterLink;
    }
  }
};
</script>

<style>
.share_options.is-expanded nav {
  visibility: visible;
  opacity: 1;
}

.share_options {
  /*border: 2px solid #eee;*/
  /*  box-shadow: 3px 3px 0px 0px #eee;*/
  cursor: pointer;
  /*  margin-right: 10px;*/
  margin-right: 15px;
  overflow: hidden;
  /*  min-width: 160px;*/
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.share_options.is-expanded nav {
  visibility: visible;
  opacity: 1;
}

.share_options.is-expanded .MenuIcon-line:nth-child(1) {
  top: 50%;
}
.share_options.is-expanded .MenuIcon-line:nth-child(3) {
  top: 50%;
}
</style>
