// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'


Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts

Vue.prototype.bus = new Vue;

axios.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error);
  }
)
/* eslint-disable no-new */
axios.interceptors.response.use(
    res => {
      return res.data
    },
    error => {
      return Promise.reject(error);
    }
);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
