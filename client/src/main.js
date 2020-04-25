import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import i18nConfig from './i18n/config';
import { setGlobals } from './config/axios';
import router from './router';

setGlobals()
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueRouter);

const i18n = new VueI18n(i18nConfig);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
