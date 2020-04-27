<template>
  <div class="account-manager">
    <form @submit.prevent="login" class="signin-form" method="POST">
      <div v-if="error" class="inputErrorContainer">
        <div class="inputErrorText">{{ error }}</div>
      </div>
      <div class="login-title">Logi sisse</div>
      <input
        v-model="username"
        class="login-input"
        name="username"
        type="text"
        placeholder="Username or email"
        autocomplete="off"
      />
      <input
        v-model="password"
        class="login-input"
        name="password"
        type="password"
        placeholder="Password"
        autocomplete="off"
      />
      <router-link class="forgotPass" to="/forgotpassword">Unustasid parooli?</router-link>
      <div class="submit">
        <input :disabled="submitting" class="login-button" type="submit" value="Log in" />
      </div>
      <div v-if="success" class="successMessage">Parool on edukalt muudetud. Logi sisse.</div>
      <router-link class="accountExists__registerPage" to="/register">Või loo kasutaja</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: '',
      submitting: false,
      success: false,
    };
  },
  methods: {
    async login() {
      this.submitting = true;
      try {
        const { username, password } = this;
        const response = await axios.post(`accounts/login`, {
          username,
          password,
        });
        this.error = '';
        this.$emit("update", response.data);
        this.$router.push('/');
      } catch (error) {
        if (error.response.status === 401) {
          this.error = error.response.data.error;
        } else {
          console.log("internal server error");
        }
      } finally {
        this.submitting = false;
      }
    },
    getError(field) {
      const error = this.errors.filter(each => each.param === field)[0];
      return error ? error.msg : "";
    }
  }
};
</script>

<style scoped>
/*! CSS Used from: https://www.eeter.tv/css/registration.css */
.login-button {
  height: 100%;
  background-color: transparent !important;
  color: #555 !important;
  border-radius: 40px;
  box-sizing: border-box;
  font-weight: 600;
  padding: 12px;
  font-size: 14px !important;
  cursor: pointer;
}
.login-button {
  color: #ffffff !important;
}
.signin-form {
  margin: auto;
  width: 600px;
  text-align: center;
}
.signin-form {
  margin-top: 200px;
  margin-bottom: 40px;
}
.login-input {
  width: 200px;
  border-radius: 3px;
  border: 1px solid #eee;
  margin-right: 16px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 325px;
  padding: 15px !important;
  display: block !important;
  margin-bottom: 20px !important;
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
}
.login-input:focus {
  border-left: 3px solid #120088;
}
.login-button {
  width: 325px !important;
  font-size: 18px !important;
  transition: 0.2s ease-in-out !important;
  margin-top: 5px !important;
  padding: 10px !important;
  background-color: #120088 !important;
  box-shadow: 3px 3px 0px 0px #120088bf;
}
.login-button:hover {
  background-color: #100269 !important;
}
.login-title {
  font-size: 45px;
  text-align: left;
  width: 325px;
  margin: 0 auto;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}
.account-manager {
  background-color: #fff;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  flex-grow: 1;
}
.forgotPass {
  color: #b1b1b1;
  text-align: left;
  margin: 0 auto;
  width: 325px;
  margin-bottom: 13px;
  cursor: pointer;
  display: block;
}
.forgotPass:hover {
  text-decoration: underline;
}
.accountExists__registerPage {
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: auto;
  padding: 0;
  font-size: 14px;
  color: #b1b1b1;
  margin-top: 20px;
  border-radius: 3px;
  display: inline-block;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  transition: 85ms ease;
}
.accountExists__registerPage:hover {
  text-decoration: underline;
  color: #ececec;
}
.inputErrorContainer {
  padding: 10px;
  color: red;
  background-color: transparent;
}
.successMessage {
  margin: 30px auto;
  font-size: 15px;
  max-width: 300px;
  color: #fff;
  background-color: #222;
  box-sizing: border-box;
  font-weight: 600;
  padding: 8px;
  border-radius: 3px;
  font-family: "Trebuchet MS", sans-serif;
}
</style>