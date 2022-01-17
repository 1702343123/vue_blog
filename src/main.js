// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import App from './App'

Vue.use(ElementUI);
Vue.config.productionTip = false;
// Vue.prototype.apiServer = 'http://192.168.0.104:8888/'
Vue.prototype.apiServer='http://localhost:8888/';
Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
