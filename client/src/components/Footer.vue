<template>
  <div class="footer">
    <div class="footer_sections">
      <router-link to="/about" class="footer_section">
        <div class="footer_about">Meist</div>
      </router-link>
      <router-link to="/privacy" class="footer_section">
        <div class="footer_privacy">Privaatsus</div>
      </router-link>
      <router-link to="/terms" class="footer_section">
        <div class="footer_terms">Tingimused</div>
      </router-link>
      <router-link to="/contact" class="footer_section">
        <div class="footer_contact">Kontakt</div>
     </router-link>
      <div class="footer_section right">
        <div class="rights_reserved">Kõik õigused kaitstud.</div>
      </div>
      <div class="footer_section right">
        <div class="copyrights">© 2020 Eeter.tv</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>
