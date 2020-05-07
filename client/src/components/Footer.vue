<template>
  <div class="footer">
    <div class="footer_sections desktopSize">
      <router-link to="/about" class="footer_section">
        <div class="footer_about">{{$t("footer.about")}}</div>
      </router-link>
      <router-link to="/privacy" class="footer_section">
        <div class="footer_privacy">{{$t("footer.privacy")}}</div>
      </router-link>
      <router-link to="/terms" class="footer_section">
        <div class="footer_terms">{{$t("footer.terms")}}</div>
      </router-link>
      <router-link to="/contact" class="footer_section">
        <div class="footer_contact">{{$t("footer.contact")}}</div>
      </router-link>
      <router-link to="/feature-requests" class="footer_section">
        <div class="footer_feature_request">{{$t("footer.feature-requests")}}</div>
      </router-link>
      <router-link to="/philosophy">
        <img class="elonicon" src="../assets/images/elonicon.png" />
      </router-link>
      <div class="footer_section right">
        <div class="rights_reserved">{{$t("footer.rights")}}</div>
      </div>
      <div class="footer_section right">
        <div class="copyrights">{{$t("footer.copyright")}}</div>
      </div>
    </div>
    <div class="footer_sections mobileSize">
      <div class="footer_wrapper">
        <div class="footer_sections_container">
          <router-link to="/about" class="footer_section">
            <div class="footer_about">{{$t("footer.about")}}</div>
          </router-link>
          <router-link to="/contact" class="footer_section">
            <div class="footer_contact">{{$t("footer.contact")}}</div>
          </router-link>
          <router-link to="/feature-requests" class="footer_section">
            <div class="footer_feature_request">{{$t("footer.feature-requests")}}</div>
          </router-link>
        </div>
        <div class="footer_sections_container">
          <router-link to="/privacy" class="footer_section">
            <div class="footer_privacy">{{$t("footer.privacy")}}</div>
          </router-link>
          <router-link to="/terms" class="footer_section">
            <div class="footer_terms">{{$t("footer.terms")}}</div>
          </router-link>
        </div>
      </div>
      <div class="footer_bottom_container">
        <router-link to="/philosophy">
          <img class="elonicon" src="../assets/images/elonicon.png" />
        </router-link>
        <div class="footer_section right">
          <div class="rights_reserved">{{$t("footer.rights")}}</div>
        </div>
        <div class="footer_section right">
          <div class="copyrights">{{$t("footer.copyright")}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.elonicon {
  height: 18px;
  margin-left: auto;
  float: right;
}
</style>
