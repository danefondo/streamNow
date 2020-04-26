<template>
  <div v-if="loading" class="verification-wrapper">
    <img src="../assets/loading.gif" />
  </div>
  <div v-else class="verification-wrapper">
    <div data-v-56f6b788 class="verification-container">
      <div data-v-56f6b788 class="verification-message-box"></div>
      <p data-v-56f6b788 class="verification-message">{{ $t(`${message}`) }}</p>
      <router-link to="/" v-if="verified" data-v-56f6b788 class="watch-streams-button">
        <div data-v-56f6b788 class="watch-streams-text">{{$t("verification.watch-streams")}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VerifyUser",
  data() {
    return {
      loading: true,
      message: "",
      verified: false,
    };
  },
  async mounted() {
    try {
      const { data } = await axios.get(
        `/accounts/verify/${this.$route.params.token}`
      );
      this.message = data.message;
      this.verified = true;
      this.$emit("update", data);
    } catch ({ response }) {
      this.message = response.data.message;
      this.verified = false;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.verification-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -100px;
}

.watch-streams-button {
  padding: 16px;
  background-color: #130088;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin-top: 40px;
}

.watch-streams-button:hover {
  background-color: #120088bd;
}

.watch-streams-text {
  font-size: 30px;
}

.verification-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verification-message {
  max-width: 700px;
  font-size: 50px;
}
</style>