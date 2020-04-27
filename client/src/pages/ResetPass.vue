<template>
  <div class="account-manager">
    <form @submit.prevent="resetPassword" class="form__resetPass" method="POST">
      <div class="inputErrorContainer">
        <div class="inputErrorText"></div>
      </div>
      <div class="form__title">Reset password</div>
      <div class="subtitle__resetPass">Enter your new password.</div>
      <input
        v-model="password"
        class="input__general"
        name="password"
        type="password"
        placeholder="New password"
        autocomplete="off"
      />
      <input
        v-model="confirmPassword"
        class="input__general"
        name="passcheck"
        type="password"
        placeholder="Confirm password"
        autocomplete="off"
      />
      <div class="submit">
        <input class="button__resetPass" type="submit" value="Submit" />
      </div>
      <div v-if="message" class="successMessage">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPass",
  data() {
    return {
      password: "",
      confirmPassword: "",
      message: "",
      loading: true,
      validToken: ""
    };
  },
  mounted() {
    // check if token is valid
  },
  methods: {
    async resetPassword() {
      if (!this.password || this.password != this.confirmPassword) {
        return (this.message = "Passwords are required and they must match");
      }
      try {
        const { data } = await axios.post("/accounts/reset", {
          password: this.password,
          passcheck: this.confirmPassword,
          token: this.$route.params.t
        });
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500);
        this.message = data.message;
      } catch ({ response }) {
        this.message = response.data.message;
      }
    }
  }
};
</script>

<style>
/*! CSS Used from: https://www.eeter.tv/css/reset.css */
div,
form {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/*! CSS Used from: https://www.eeter.tv/css/main.css */
* {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input:focus {
  outline: none;
}
input {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  background-color: #fff;
  font-family: "Trebuchet MS", sans-serif;
}
input[type="submit"] {
  background-color: #120088;
  color: white;
  font-family: "Trebuchet MS", sans-serif;
  transition: 0.2s ease-in-out !important;
}
input[type="submit"]:hover {
  background-color: #100269;
  color: white;
  border-radius: 3px;
}
div {
  display: block;
}
/*! CSS Used from: https://www.eeter.tv/css/registration.css */
.button__resetPass {
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
.button__resetPass {
  color: #ffffff !important;
}
.form__resetPass {
  margin: auto;
  width: 600px;
  text-align: center;
}
.form__resetPass {
  margin-top: 150px;
}
.input__general {
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
.input__general:focus {
  border-left: 3px solid #120088;
}
.button__resetPass {
  width: 325px !important;
  font-size: 18px !important;
  transition: 0.2s ease-in-out !important;
  margin-top: 5px !important;
  padding: 10px !important;
  background-color: #120088 !important;
  box-shadow: 3px 3px 0px 0px #120088bf;
}
.button__resetPass:hover {
  background-color: #100269 !important;
}
.form__title {
  font-size: 45px;
  text-align: left;
  width: 325px;
  margin: 0 auto;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}
.subtitle__resetPass {
  width: 325px;
  margin: 0 auto;
  text-align: left;
  font-size: 18px;
  margin-bottom: 30px;
  color: #666;
}
.inputErrorContainer {
  padding: 10px;
  color: red;
  background-color: transparent;
}
</style>