<template>
  <section class="hero-content block-marg">
    <div class="container cont-840 align-center wrapper-404">
      <h1 class="page-title">{{$t("scheduled.oops")}}</h1>

      <h2 class="sub-head">{{$t("scheduled.no-scheduled")}}</h2>

      <div class="short-desc">
        <p>{{$t("scheduled.check-back")}}</p>
        <p class="schedule_it">
          {{$t("scheduled.or")}}
          <router-link to="/golive">{{$t("scheduled.schedule-stream")}}</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NoScheduledStreams"
};
</script>

<style scoped>
@media all {
  .schedule_it {
    font-size: 18px;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  section {
    display: block;
  }
  h1,
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  h1,
  h2 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }

  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  @media print {
    *,
    *::before,
    *::after {
      text-shadow: none !important;
      box-shadow: none !important;
    }
    p,
    h2 {
      orphans: 3;
      widows: 3;
    }
    h2 {
      page-break-after: avoid;
    }
    .container {
      min-width: 992px !important;
    }
  }
  *:focus {
    outline: none;
  }
  p {
    margin-bottom: 40px;
  }
  @media (max-width: 992px) {
    p {
      margin-bottom: 30px;
    }
  }
  @media (max-width: 767px) {
    p {
      margin-bottom: 20px;
    }
  }
  .align-center {
    text-align: center;
  }
  a {
    transition: color 0.4s ease;
    text-decoration: underline;
    color: #ca4c2f;
  }
  a:hover {
    color: #a13c25;
  }
  h2 {
    font-weight: 300;
    line-height: 42px;
    font-size: 33px;
    font-family: "Poppins", sans-serif;
    color: #2b334e;
    margin-bottom: 35px;
  }
  @media (max-width: 1100px) {
    h2 {
      line-height: 37px;
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 992px) {
    h2 {
      line-height: 26px;
      font-size: 20px;
      margin-bottom: 15px;
    }
  }
  .block-marg {
    margin-bottom: 120px;
  }
  @media (max-width: 1100px) {
    .block-marg {
      margin-bottom: 100px;
    }
  }
  @media (max-width: 992px) {
    .block-marg {
      margin-bottom: 75px;
    }
  }
  .container {
    max-width: 1480px;
  }
  @media (max-width: 1580px) {
    .container {
      padding-right: 50px;
      padding-left: 50px;
      max-width: 1580px;
    }
  }
  @media (max-width: 992px) {
    .container {
      padding-right: 30px;
      padding-left: 30px;
    }
  }
  .container.cont-840 {
    max-width: 840px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .wrapper-404 h1.page-title {
    font-weight: bold;
    line-height: 120px;
    font-size: 110px;
    font-family: "Poppins", sans-serif;
    margin-bottom: 30px;
    color: #2a2d38;
  }
  @media (max-width: 992px) {
    .wrapper-404 h1.page-title {
      line-height: 90px;
      font-size: 70px;
    }
  }
  @media (max-width: 767px) {
    .wrapper-404 h1.page-title {
      line-height: 70px;
      font-size: 50px;
      margin-bottom: 20px;
    }
  }
  .wrapper-404 h2.sub-head {
    font-weight: 300;
    line-height: 60px;
    font-size: 46px;
    font-family: "Poppins", sans-serif;
    margin-bottom: 40px;
    color: #2b334e;
    margin-bottom: 20px;
  }
  @media (max-width: 1500px) {
    .wrapper-404 h2.sub-head {
      line-height: 54px;
      font-size: 40px;
      margin-bottom: 35px;
    }
  }
  @media (max-width: 1100px) {
    .wrapper-404 h2.sub-head {
      line-height: 45px;
      font-size: 33px;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px) {
    .wrapper-404 h2.sub-head {
      font-weight: 300;
      line-height: 32px;
      font-size: 22px;
    }
  }
  @media (max-width: 992px) {
    .wrapper-404 h2.sub-head {
      line-height: 30px;
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    .wrapper-404 h2.sub-head {
      line-height: 28px;
      font-size: 18px;
    }
  }
  .wrapper-404 .short-desc {
    font-weight: 300;
    line-height: 35px;
    font-size: 23px;
  }
  @media (max-width: 992px) {
    .wrapper-404 .short-desc {
      line-height: 32px;
      font-size: 18px;
    }
  }
  @media (max-width: 767px) {
    .wrapper-404 .short-desc {
      line-height: 30px;
      font-size: 16px;
    }
    .wrapper-404 .short-desc br {
      display: none;
    }
  }
  .wrapper-404 .short-desc a {
    text-decoration: none;
    background-image: linear-gradient(#ca4c2f, #ca4c2f);
    background-position: 0 90%;
    background-repeat: repeat-x;
    background-size: 1px 1px;
    text-shadow: -1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff;
  }
  .wrapper-404 .short-desc a:hover {
    text-decoration: none;
    background-image: linear-gradient(#a13c25, #a13c25);
  }
  .wrapper-404 .short-desc p:last-of-type {
    margin-bottom: 0;
  }
  .hero-content {
    margin: -100px auto 0px auto;
  }
  @media (max-width: 1300px) {
    .hero-content {
      margin-top: 64px;
    }
  }
  @media (max-width: 992px) {
    .hero-content {
      margin-top: 25px;
    }
  }
}
/*! CSS Used fontfaces */
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 200;
  src: local("Poppins ExtraLight"), local("Poppins-ExtraLight"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLFj_Z11lFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8,
    U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 200;
  src: local("Poppins ExtraLight"), local("Poppins-ExtraLight"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLFj_Z1JlFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 200;
  src: local("Poppins ExtraLight"), local("Poppins-ExtraLight"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLFj_Z1xlFd2JQEk.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 300;
  src: local("Poppins Light"), local("Poppins-Light"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z11lFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8,
    U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 300;
  src: local("Poppins Light"), local("Poppins-Light"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z1JlFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 300;
  src: local("Poppins Light"), local("Poppins-Light"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  src: local("Poppins Regular"), local("Poppins-Regular"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2)
      format("woff2");
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8,
    U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  src: local("Poppins Regular"), local("Poppins-Regular"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  src: local("Poppins Regular"), local("Poppins-Regular"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  src: local("Poppins Medium"), local("Poppins-Medium"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z11lFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8,
    U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  src: local("Poppins Medium"), local("Poppins-Medium"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1JlFd2JQEl8qw.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  src: local("Poppins Medium"), local("Poppins-Medium"),
    url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
</style>