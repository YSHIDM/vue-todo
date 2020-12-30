import { Component } from "vue-property-decorator"
import Vant from 'vant';
import AmapVue from '@amap/amap-vue'
import md5 from 'js-md5'
// import Validate from "@/plugins/validate"
// import BaseComponents from "@/components/base/index" // 这里做了所有的base组件的自动导入

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'vant/lib/index.css';
import '@/style/var.css'

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Component.registerHooks([
  "beforeRouteLeave"
]);

Vue.use(Vant);

AmapVue.config.version = '2.0'
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
] as never[]
AmapVue.config.key = '6bcc4e20c0184e1ed3b92437acdbdbd7'
Vue.use(AmapVue)
// Vue.use(Validate);
// Vue.use(BaseComponents);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
