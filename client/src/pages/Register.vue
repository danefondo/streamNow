<template>
  <Success v-if="success" />
  <div v-else class="registrationBlock__registerPage">
    <div class="titleBlock__registerPage">
      <h1 class="title__registerPage">Join Eeter.tv</h1>
      <div class="subtitle__registerPage">...and start broadcasting today.</div>
    </div>
    <div class="registration-form">
      <form class="form-register" method="POST" @submit.prevent="register()">
        <div class="notifier__register">
          <h2>Errors</h2>
        </div>
        <div class="form-groups">
          <div class="form-group">
            <input
              v-model="email"
              class="input__registration first-input"
              name="email"
              type="text"
              placeholder="example@mail.com"
              autocomplete="falsess"
            />
            <div class="inputErrorContainer">
              <div class="inputErrorText">{{ getError('email') }}</div>
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="username"
              class="input__registration"
              name="username"
              type="text"
              placeholder="Username"
              autocomplete="falsess"
            />
            <div class="inputErrorContainer">
              <div class="inputErrorText">{{ getError('username') }}</div>
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="password"
              class="input__registration inline passwordInput"
              name="password"
              :type="passwordType ? 'password' : 'text'"
              placeholder="Password (at least 8 characters)"
              autocomplete="off"
            />
            <div class="showPassContainer">
              <img
                @click="toggleType('passwordType')"
                class="showPass inline"
                src="../assets/images/light-eye-unbox.png"
              />
            </div>
            <div class="inputErrorContainer">
              <div class="inputErrorText">{{ getError('password') }}</div>
            </div>
          </div>
          <div class="form-group last-form-group">
            <input
              v-model="passwordCheck"
              class="input__registration last-input passwordInput"
              name="passcheck"
              :type="passwordCheckType ? 'password' : 'text'"
              placeholder="Confirm password"
              autocomplete="off"
            />
            <div class="showPassContainer">
              <img
                @click="toggleType('passwordCheckType')"
                class="showPass inline"
                src="../assets/images/light-eye-unbox.png"
              />
            </div>
            <div class="inputErrorContainer">
              <div class="inputErrorText">{{ getError('passcheck') }}</div>
            </div>
          </div>
        </div>
        <div class="buttonGroup">
          <input
            :disabled="submitting"
            class="register-button"
            type="submit"
            :value="submitting ? $t('register.creating') : $t('register.create')"
          />

          <router-link class="accountExists__registerPage" to="/login">Already have an account?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Success from "../components/Success";
import { BASE_PATH } from "../constants";

export default {
  name: "Register",
  components: {
    Success
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      passwordCheck: "",
      errors: [],
      passwordCheckType: true,
      passwordType: true,
      submitting: false,
      success: false
    };
  },
  methods: {
    toggleType(type) {
      this[type] = !this[type];
    },
    async register() {
      this.submitting = true;
      try {
        const { email, username, password, passwordCheck } = this;
        await axios.post(`${BASE_PATH}/accounts/register`, {
          email,
          username,
          password,
          passcheck: passwordCheck
        });
        this.errors = [];
        this.success = true;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
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

<style>
/*! CSS Used from: https://www.eeter.tv/css/registration.css */
.registrationBlock__registerPage {
  margin: 0 auto;
  margin-bottom: 40px;
}
.registration-form {
  width: 400px;
  margin: auto;
}
.titleBlock__registerPage {
  width: 400px;
  margin: auto;
  text-align: left;
  padding: 20px;
  padding-top: 110px;
}
.title__registerPage {
  font-size: 45px;
  font-weight: 600;
  color: #333;
}
.subtitle__registerPage {
  color: #666;
  font-size: 25px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin: 5px 0 5px 5px;
  font-weight: 600;
}
.register-button {
  margin-left: 2px;
  margin-right: 20px;
  border-radius: 4px;
  padding: 12px;
  font-weight: 600;
  width: 170px;
  text-align: left;
  font-size: 20px;
  cursor: pointer;
  transition: 85ms ease;
  box-shadow: 3px 3px 0px 0px #120088bf;
  border: none;
  background-color: #120088;
  color: white;
  font-family: "Trebuchet MS", sans-serif;
  box-sizing: border-box;
  display: inline-block;
}
.register-button:hover {
  transform: scale(1.01);
  background-color: #100269;
  color: white;
  border-radius: 4px;
}
.register-button:disabled {
  cursor: not-allowed;
  background-color: #302a52 !important;
}
.form-groups {
  border-radius: 3px;
  border-bottom: none;
  border-right: none;
  margin-bottom: 10px;
}
.form-group {
  position: relative;
}
.last-form-group {
  border-bottom: none;
}
.input__registration {
  width: 90%;
  color: #333;
  border: 1px solid #eee;
  font-size: 18px !important;
  padding: 15px !important;
  border-radius: 3px !important;
  background-color: #fff;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
}
.input__registration:focus {
  border-left: 3px solid #120088;
}
.input__registration:focus::placeholder {
  color: transparent;
}
.first-input {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.last-input {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
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
.notifier__register {
  width: 390px;
  height: 200px;
  background-color: #2c4450;
  margin: 10px 5px 15px 5px;
  border: 2px solid #1e3c4a;
  display: none;
}
.passwordInput {
  display: inline-block;
  width: 90%;
}
.showPassContainer {
  padding: 5px 0px;
  display: inline-block;
  box-sizing: border-box;
  width: 10%;
  text-align: center;
}
.showPass {
  width: 60%;
  vertical-align: middle;
  cursor: pointer;
}
.serverErrorContainer {
  position: absolute;
  display: flex;
  padding: 0 15px;
  height: 40px;
  border: 2px solid red;
  right: -65%;
  color: white;
  background-color: #b63a3a;
  top: 6px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  text-align: center;
  display: none;
}
.inputErrorContainer {
  padding: 10px;
  color: red;
  background-color: transparent;
}
</style>
