<template>
  <div class="RegisterSuccessContainer">
    <div class="WelcomeBlock">
      <!-- <h1 class="RegisterSuccess WelcomeMessage">{{$t("successPage.welcome")}}</h1> -->
      <h1
        class="RegisterSuccess WelcomeMessage"
      >{{$t("restrict.head")}}</h1>
      <h1
        class="RegisterSuccess WelcomeSubtitle"
      >{{$t("restrict.tagline")}}</h1>
      <!-- <h1
        class="RegisterSuccess WelcomeSubtitle"
      >Anna märku.</h1> -->
    </div>
    <router-link class="go_live_block" to="/">
      <h1 class="start_streaming">{{$t("restrict.action")}}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ShowInterest"
};
</script>

<style scoped>
.WelcomeBlock {
  margin: -40px auto 0px auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h1.RegisterSuccess {
  font-size: 6vh;
  margin: 10px 0px;
  padding: 5px;
}
.WelcomeMessage {
  font-size: 66px !important;
}
/* .WelcomeSubtitle {
  font-size: 22px !important;
  color: #333 !important;
  max-width: 600px;
} */
.WelcomeSubtitle {
  font-size: 23px !important;
  color: #333 !important;
  max-width: 700px;
  line-height: 28px;
}
.go_live_block,
.watch_streams_now {
  background-color: #130089;
  margin: 50px auto 0px auto;
  padding: 25px 30px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-bottom: 20px;
  text-align: center;
  /* width: 350px; */
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
  font-size: 45px;
}
.RegisterSuccessContainer {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  z-index: 1;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
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