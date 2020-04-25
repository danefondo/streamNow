<template>
  <div class="settings">
    <div class="modal__changePassword">
      <div class="modalBackground__changePassword"></div>
      <div class="deleteModal">
        <div class="content-wrapper">
          <div class="msg-title">Enter your current password</div>
          <div class="msg-body">Verify it's you.</div>
          <input
            class="stream_input"
            placeholder="Your current password"
            type="password"
            data-field="currentpass"
          />
          <div class="passwordChangeErrorNotifier__accountSettings">
            <div class="passwordChangeError__accountSettings"></div>
          </div>
          <div class="action-group modifiedActionGroup">
            <div class="cancelChangePassword button-outline">CANCEL</div>
            <div class="confirmChangePassword button-filled">CHANGE</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__deleteAccount">
      <div class="modalBackground__deleteAccount"></div>
      <div class="deleteModal">
        <div class="content-wrapper">
          <div class="msg-title">Are you sure you want to delete your account?</div>
          <div
            class="msg-body"
          >Your account will be permanently deleted and you will lose ownership and access to all your existing content.</div>
          <div class="action-group">
            <div class="cancelPermaDeleteAccount button-outline">CANCEL</div>
            <div class="confirmPermaDeleteAccount button-filled">DELETE</div>
          </div>
        </div>
      </div>
    </div>
    <div class="curataContainer sideNavMargin">
      <div class="pageTitle__accountSettings">Account settings</div>
      <div class="user_not_verified">
        <p class="not_verified_message">Please verify your email address.</p>
      </div>
      <div class="success_content">
        <div class="generalErrorContainer">
          <div class="generalErrorText">Please fill all required empty fields.</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">What's your name?</div>
          <div class="pass_section">
            <div class="pass_field">First name</div>
            <input
              class="stream_input stream_name"
              placeholder="This' what they call me"
              data-field="firstname"
              value="Robert"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">Last name</div>
            <input
              class="stream_input stream_name"
              placeholder="Dr. Strange"
              data-field="lastname"
              value="Foenix"
            />
          </div>
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_name_button">Save name</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">Now how about a description!</div>
          <textarea
            class="stream_input stream_description height-120"
            placeholder="Genius, billionaire, playboy, philanthropist"
            data-field="description"
          >I make code.</textarea>
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_description_button">Save description</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">How about a profile picture?</div>
          <div class="entryDetailsGroup auto-side-margins">
            <div class="mainImage" id="imageArea_">
              <div
                class="file-upload imageBlock"
                data-type="mainImage"
                data-image-key="1586454443289"
              >
                <form
                  class="image-upload-wrap imageForm hide"
                  action="/' + coreURL + '/sign-s3"
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <input
                    class="file-upload-input"
                    id="file-input"
                    type="file"
                    name="image"
                    accept="image/jpg"
                  />
                  <div class="drag-text padding-60">
                    <button class="file-upload-btn" type="button">Upload profile image</button>
                    <h3>Or just drag and drop a file</h3>
                  </div>
                </form>
                <div class="file-upload-content show">
                  <img
                    class="file-upload-image"
                    src="https://curata.s3.amazonaws.com/1586454443289"
                    alt="your image"
                  />
                  <div class="image-title-wrap">
                    <button class="remove-image" type="button">
                      <span class="image-pre-title">Remove</span>
                      <span class="image-title">alien.JPG</span>
                      <span class="image-uploading-title">Uploading image...</span>
                      <span class="image-removing-title">Removing image...</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">Let's add some social media!</div>
          <div class="pass_section">
            <div class="pass_field">Website</div>
            <input
              class="stream_input stream_name"
              placeholder="www.myswag.com"
              data-field="website"
              value="http://www.swag.com"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">Facebook</div>
            <input
              class="stream_input stream_name"
              placeholder="www.facebook.com"
              data-field="facebook"
              value="http://facebook.com"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">Twitter</div>
            <input
              class="stream_input stream_name"
              placeholder="www.twitter.com"
              data-field="twitter"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">YouTube</div>
            <input
              class="stream_input stream_name"
              placeholder="www.youtube.com"
              data-field="youtube"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">Instagram</div>
            <input
              class="stream_input stream_name"
              placeholder="www.instagram.com"
              data-field="instagram"
            />
          </div>
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_social_button">Save social media links</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">Change your username</div>
          <input
            class="stream_input stream_name"
            placeholder="That cool user handle"
            value="robertfoenix"
            data-field="username"
          />
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_username_button">Save username</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">Change your email</div>
          <input
            class="stream_input stream_name"
            placeholder="example@cool.com"
            value="robertfoenix@gmail.com"
            data-field="email"
          />
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_email_button">Save email</div>
        </div>
        <div class="settings_section">
          <div class="success_input_title">Change your password</div>
          <div class="pass_section">
            <div class="pass_field">New password</div>
            <input
              class="stream_input stream_name"
              placeholder="**********"
              type="password"
              data-field="password"
            />
          </div>
          <div class="pass_section">
            <div class="pass_field">Confirm password</div>
            <input
              class="stream_input stream_name"
              placeholder="**********"
              type="password"
              data-field="passconfirm"
            />
          </div>
          <div class="inputErrorContainer">
            <div class="inputErrorText"></div>
          </div>
          <div class="inputSuccessContainer">
            <div class="inputSuccessText"></div>
          </div>
          <div class="save_pass_button">Save password</div>
        </div>
        <div class="settings_delete_section">
          <div class="success_input_title">Delete your account</div>
          <div class="section__accountSettings deleteAccount__accountSettings">
            <div
              class="deleteAccountText"
            >Deleting your account will permanently and irreversably delete all your streams, stream data and profile details and history. Deleting your account will cancel any memberships you have.</div>
            <div class="deleteAccountButton">
              <p class="deleteAccountButtonText">Delete account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings"
};
</script>

<style>
.settings {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
}

/*! CSS Used from: https://www.eeter.tv/css/reset.css */
div,
span,
h3,
p,
img,
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
input:focus,
textarea:focus {
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
h3 {
  font-size: 18px;
  font-weight: 500;
}
p {
  white-space: normal;
}
div,
p {
  display: block;
}
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100%;
  min-height: calc(100vh - 105px);
}
.show {
  display: block !important;
}
.hide {
  display: none !important;
}
.modal__deleteAccount,
.modal__changePassword {
  display: none;
}
.success_input_title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #333;
}
.entryDetailsGroup {
  background-color: #fbfbfb;
  font-size: 20px;
  color: #0e0e0e;
  border-radius: 6px;
  position: relative;
  border: 1px solid #eee;
  margin-top: 15px;
  max-width: 325px;
}
.curataContainer {
  margin-top: 50px;
  width: 70%;
  margin-bottom: 100px;
}
.sideNavMargin {
  margin-left: auto;
  margin-right: auto;
}
.button-filled {
  display: inline-block;
  font-weight: 600;
  color: white;
  letter-spacing: 0.1rem;
  background-color: blue;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  padding: 12px;
  text-align: center;
  transition: 0.2s ease;
}
.button-filled:hover {
  background-color: #0000ff94;
}
.button-outline {
  display: inline-block;
  border-radius: 2px;
  border: none;
  font-weight: 600;
  letter-spacing: 0.1rem;
  color: #9299a6;
  text-align: center;
  background: none;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s ease;
}
.button-outline:hover {
  color: #b9bcc1;
}
.deleteModal {
  position: fixed;
  z-index: 9999;
  top: 20%;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 350px;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  border: none;
  padding: 20px;
}
.content-wrapper {
  width: 290px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.msg-title {
  margin-top: 30px;
  font-size: 20px;
}
.msg-body {
  padding-top: 10px;
  font-weight: 100;
  font-size: 16px;
  display: block;
}
.action-group {
  width: 100%;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
.modifiedActionGroup {
  margin-left: 0px;
}
.button-outline.cancelPermaDeleteAccount,
.button-outline.cancelChangePassword {
  width: 98px;
}
.button-filled.confirmPermaDeleteAccount,
.button-filled.confirmChangePassword {
  width: 98px;
  margin-right: 12px;
}
.confirmPermaDeleteAccount {
  background-color: #a70029;
}
.modalBackground__deleteAccount,
.modalBackground__changePassword {
  background-color: #1f1f1f;
  opacity: 0.5;
  top: 0;
  z-index: 1003;
  position: fixed;
  width: 100%;
  height: 100%;
}
.pageTitle__accountSettings {
  font-size: 55px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.pageTitle__accountSettings {
  text-align: center;
  font-size: 40px;
}
.user_not_verified {
  margin: 0 auto;
  max-width: 300px;
  text-align: center;
  padding: 10px 5px;
  border-radius: 2px;
  background-color: #ffbcbc;
  font-weight: bold;
}
.save_pass_button,
.save_username_button,
.save_email_button,
.save_description_button,
.save_name_button,
.save_social_button {
  text-align: center;
  padding: 15px;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  display: block;
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin: 0 auto;
  background-color: blue;
  margin-top: 20px;
}
.save_pass_button:hover,
.save_username_button:hover,
.save_email_button:hover,
.save_description_button:hover,
.save_name_button:hover,
.save_social_button:hover {
  transform: scale(1.02);
}
.deleteAccountText {
  font-size: 17px;
  color: #424242;
  padding-top: 25px;
  line-height: 23px;
  padding-left: 7px;
  padding-right: 6px;
  line-height: 25px;
  font-weight: 400;
}
.deleteAccountButton {
  text-align: center;
  background-color: #a70029;
  padding: 15px;
  margin-top: 20px;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  display: block;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.deleteAccountButton {
  margin-bottom: 20px;
}
.deleteAccountButton:hover {
  transform: scale(1.02);
}
.section__accountSettings {
  padding: 7px 30px;
  border: 1px solid #f9f9f9;
  margin: 28px auto;
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px #f1f1f1;
  background-color: #fff;
  margin-bottom: 40px;
  min-height: 66px;
}
.section__accountSettings {
  margin-top: 14px;
}
.deleteAccount__accountSettings {
  border: 1px solid #eaeaea;
  font-weight: bold;
  box-shadow: none;
}
.passwordChangeErrorNotifier__accountSettings {
  display: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  text-align: center;
}
.passwordChangeErrorNotifier__accountSettings {
  position: relative;
  width: 100%;
  right: 0px;
  background-color: transparent;
  padding: 10px;
  margin-top: 10px;
  color: red;
  font-weight: 400;
}
.file-upload {
  background-color: #fbfbfb;
  box-sizing: border-box;
}
.file-upload-btn {
  margin: 0;
  font-size: 29px;
  background: transparent;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  outline: none;
  font-weight: 700;
  color: #130089;
  font-family: "Trebuchet MS", sans-serif;
  margin-bottom: 10px;
}
.file-upload-btn:hover {
  background: #1aa059;
  color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.file-upload-btn:active {
  border: 0;
  transition: all 0.2s ease;
}
.file-upload-content {
  text-align: center;
}
.file-upload-input {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
}
.image-upload-wrap {
  position: relative;
}
.image-upload-wrap:hover {
  background-color: white;
  border-color: 4px solid #efefef;
  border-radius: 3px;
}
.image-title-wrap {
  padding: 0 15px 15px 15px;
  color: #222;
}
.image-uploading-title,
.image-removing-title {
  display: none;
}
.drag-text {
  text-align: center;
  padding: 30px 0px;
  color: white;
}
.drag-text h3 {
  color: #333;
  font-weight: bold;
  font-size: 18px;
}
.file-upload-image {
  max-height: 200px;
  max-width: 200px;
  margin: auto;
  padding: 20px;
}
.remove-image {
  width: 200px;
  margin: 0;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
}
.remove-image {
  background: #cd4535;
  border-bottom: 4px solid #b02818;
  color: #fff;
}
.remove-image:hover {
  background: #c13b2a;
  color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.remove-image:active {
  border: 0;
  transition: all 0.2s ease;
}
/*! CSS Used from: https://www.eeter.tv/css/registration.css */
.inputErrorContainer {
  padding: 10px;
  color: red;
  background-color: transparent;
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.height-120 {
  height: 120px !important;
}
.padding-60 {
  padding-top: 60px;
  padding-bottom: 60px;
}
.auto-side-margins {
  margin-left: auto;
  margin-right: auto;
}
/*! CSS Used from: https://www.eeter.tv/css/content.css */
textarea {
  resize: none;
}
.success_content {
  margin: 50px auto 0px auto;
  max-width: 325px;
}
.settings_delete_section {
  max-width: 325px;
  margin: 0 auto;
}
.settings_section {
  margin-bottom: 50px !important;
}
.stream_input {
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
  font-size: 18px !important;
  box-shadow: 4px 5px 0px 0px #e6e6e6;
  margin-top: 15px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
}
.stream_input:focus {
  border-left: 3px solid #120088;
}
/*! CSS Used from: https://www.eeter.tv/css/modal.css */
.inputErrorContainer,
.generalErrorContainer,
.inputSuccessContainer {
  padding: 10px;
  color: red;
  background-color: transparent;
}
.inputSuccessContainer {
  color: green;
}
.generalErrorContainer {
  margin-bottom: 20px;
  padding: 0;
  font-size: 18px;
}
.pass_field {
  font-size: 13px;
  color: #545454;
  font-weight: 500;
  margin-left: auto;
  display: block;
  margin-bottom: -10px;
  margin-top: 20px;
}
</style>