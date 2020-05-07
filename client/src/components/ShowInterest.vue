<template>
  <div class="interestContainer">
    <div class="interestBlock">
      <!-- <h1 class="RegisterSuccess WelcomeMessage">{{$t("successPage.welcome")}}</h1> -->
      <h1 class="interestTitle">{{$t("restrict.head")}}</h1>
      <h1 class="interestSubtitle">{{$t("restrict.tagline")}}</h1>
    </div>
    <router-link class="showInterestButton" to="/contact">
      <h1 class="showInterestText">{{$t("restrict.action")}}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ShowInterest"
};
</script>

<style scoped>
.interestBlock {
  margin: -40px auto 0px auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.interestTitle {
  font-size: 66px;
  margin: 10px 0px;
  padding: 5px;
}

.interestSubtitle {
  font-size: 23px;
  color: #333 !important;
  max-width: 700px;
  line-height: 28px;
  margin: 10px 0px;
  padding: 5px;
}
.showInterestButton {
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

.showInterestButton:hover {
  transform: scale(1.02);
}

h1.showInterestText {
  font-size: 45px;
}
.interestContainer {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  z-index: 1;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
}
</style>