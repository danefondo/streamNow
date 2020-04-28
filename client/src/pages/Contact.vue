<template>
  <div class="footer_page_container">
    <AboutNav />
    <div class="footer_page">
      <div class="textTitle">Kontakt</div>

      <div class="textTitle">E-mail</div>
      <div class="textSection">
        <span class="textStyle">Kõikide soovide, ideede ja nõuannetega palun kirjuta meile
          <a
            href="mailto:tere@eeter.tv"
          >tere@eeter.tv</a>,
          <a href="https://www.facebook.com/Eetertv-110182260667172" target="_blank">Facebookis</a>, või
          <a href="instagram.com/eeter.tv/" target="_blank">Instagramis</a>.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AboutNav from "../components/AboutNav";

export default {
  name: "Contact",
  components: {
    AboutNav
  }
};
</script>


<style>
.textTitle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-weight: 700;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  margin-bottom: 6px;
}
.textStyle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  line-height: 1.38;
  margin-top: 0pt;
  margin-bottom: 0pt;
}

.textSection {
  margin-bottom: 30px;
}

.footer_page_container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  font-family: "Trebuchet MS", sans-serif;
}
.footer_page {
  padding: 30px 0px;
  padding-bottom: 40px;
  font-size: 18px !important;
  max-width: 600px;
  margin: 0 auto;
}
/*! CSS Used from: https://www.eeter.tv/css/navigation.css */
.topNavigationLink__topBar {
  border-radius: 4px;
  padding: 12px 16px;
  margin: 0px 6px;
  box-sizing: border-box;
  margin-bottom: 0px;
  border: 1px solid transparent;
}
.topNavigationLink__topBar {
  color: #120088;
  font-weight: bold;
  padding: 10px 16px;
  display: inline-block;
}
.topNavigationLink__topBar:hover {
  background-color: #f5f5f5;
}
.nav-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0px 15px;
  background-color: #b1f6ff00;
  height: 60px;
}
.nav-container a {
  text-decoration: none;
}
/*! CSS Used from: https://www.eeter.tv/css/responsive.css */
@media screen and (max-width: 480px) {
  .nav-container {
    padding: 10px 0px;
    flex-wrap: wrap;
  }
  .navlinks-container {
    margin-left: 10px;
  }
  .topNavigationLink__topBar {
    padding: 10px 6px;
    margin: 0px 4px;
  }
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.nav-container {
  padding-top: 0px;
}
.auto-side-margins {
  margin-left: auto;
  margin-right: auto;
}
.active-about {
  background-color: #f7f7fb;
}
</style>
