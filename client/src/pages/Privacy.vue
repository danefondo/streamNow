<template>
    <AboutNav />
</template>

<script>
import AboutNav from "../components/AboutNav";

export default {
  name: "Privacy",
  components: {
      AboutNav
  }
};
</script>


<style>
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
