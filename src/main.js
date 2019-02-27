// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import '@/assets/scss/index.scss'
import mobileDevice from "@/libs/mobileDevice";

import { Drawer } from 'vux'

Vue.component('drawer', Drawer);

Vue.config.productionTip = false;

Vue.use(MintUI);
mobileDevice()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
