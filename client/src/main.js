import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueRouter from 'vue-router';
import i18nConfig from './i18n/config';
import { setGlobals } from './config/axios';
import router from './router';

setGlobals()
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(CKEditor);
const i18n = new VueI18n(i18nConfig);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
