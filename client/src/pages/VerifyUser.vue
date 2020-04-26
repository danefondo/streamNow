<template>
  <div v-if="loading" class="verification-wrapper">
    <img src="../assets/loading.gif" />
  </div>
  <div v-else class="verification-wrapper">
    <p class="verification-message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { setAuth } from '../config/axios';

export default {
  name: "VerifyUser",
  data() {
    return {
      loading: true,
      message: "",
    };
  },
  async mounted() {
    try {
      const { data } = await axios.get(
        `/accounts/verify/${this.$route.params.token}`
      );
      this.message = data.message;
      setTimeout(() => {
          setAuth(data.token, true);
      }, 1000)
    } catch ({ response }) {
      this.message = response.data.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.verification-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verification-message {
  max-width: 300px;
}
</style>