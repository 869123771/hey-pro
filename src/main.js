import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind";
import './permission'
import heyuiConfig from "./heyui.config";
import HeyUI from 'heyui';

Vue.use(HeyUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
