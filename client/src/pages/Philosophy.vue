<template>
  <div class="philosophy">
    <div class="philosophyTitle">Our philosophy is simple.</div>
    <div class="philosophyTag">Here it is:</div>
    <iframe
      width="560"
      height="315"
      class="elon"
      src="https://www.youtube.com/embed/U0sJJU3FaOQ"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "Philosophy"
};
</script>


<style scoped>
.elon {
  margin-top: 10px;
  border: 3px solid aquamarine;
}

.philosophy {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/images/elon.png");
  background-repeat: repeat-x;
  height: 100vh;
}

.philosophyTitle {
  font-size: 42px;
  margin-bottom: 21px;
  color: white;
}

.philosophyTag {
  font-size: 34px;
  margin-bottom: 10px;
  background-color: aquamarine;
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
