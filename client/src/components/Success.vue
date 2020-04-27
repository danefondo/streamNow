<template>
  <div class="RegisterSuccessContainer">
    <div class="WelcomeBlock">
      <h1 class="RegisterSuccess WelcomeMessage">{{$t("successPage.welcome")}}</h1>
      <h1 class="RegisterSuccess WelcomeSubtitle">{{$t("successPage.tagline")}}</h1>
    </div>
    <div class="HappyContainer">
      <img class="happy_image" src="../assets/images/success.png" />
    </div>
    <router-link class="go_live_block" to="/golive">
      <h1 class="start_streaming">{{$t("successPage.start-streaming")}}</h1>
    </router-link>
    <router-link class="watch_streams_now" to="/">
      <h1 class="start_watching">{{$t("successPage.start-watching")}}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Success"
};
</script>

<style scoped>

.WelcomeBlock {
  margin: 50px auto 0px auto;
  text-align: center;
}
h1.RegisterSuccess {
  font-size: 6vh;
  margin: 10px 0px;
  padding: 5px;
}
.WelcomeMessage {
  font-size: 60px !important;
}
.WelcomeSubtitle {
  font-size: 22px !important;
  color: #333 !important;
}
.go_live_block,
.watch_streams_now {
  background-color: #130089;
  margin: 0px auto 0px auto;
  padding: 14px 30px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-bottom: 20px;
  text-align: center;
  width: 240px;
  border: 1px solid #130089;
}
.watch_streams_now {
  background-color: transparent;
  color: #130089;
}
.go_live_block:hover,
.watch_streams_now:hover {
  transform: scale(1.02);
}

h1.start_streaming,
h1.start_watching {
  font-size: 30px;
}
.RegisterSuccessContainer {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  z-index: 1;
  margin-bottom: 40px;
}
.CheckOthersBlock {
  margin: 65px auto 0px auto;
}
h2.CheckOthers {
  background-color: #ffffff80;
  padding: 5px;
  margin: 10px auto;
  font-size: 25px;
}
.HappyContainer {
  z-index: -1;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 20px;
}
.happy_image {
  height: 390px;
}
</style>