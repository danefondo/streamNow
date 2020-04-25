<template>
  <div class="RegisterSuccessContainer">
    <div class="WelcomeBlock">
      <h1 class="RegisterSuccess WelcomeMessage">Welcome aboard!</h1>
      <h1 class="RegisterSuccess WelcomeSubtitle">You're officially part of the club!</h1>
    </div>
    <div class="HappyContainer">
      <img class="happy_image" src="../assets/images/success.png" />
    </div>
    <router-link class="go_live_block" to="/dashboard/golive">
      <h1 class="start_streaming">Start streaming!</h1>
    </router-link>
    <div class="CheckOthersBlock">
      <h2 class="CheckOthers">Or check out some cool streams by fellow streamers:</h2>
    </div>
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
.go_live_block {
  background-color: blue;
  margin: 0px auto 0px auto;
  padding: 14px 30px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.go_live_block:hover {
  transform: scale(1.02);
}
h1.start_streaming {
  font-size: 30px;
}
.RegisterSuccessContainer {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  z-index: 1;
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
  height: 400px;
}
</style>