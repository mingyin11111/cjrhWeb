// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login  from './components/Login'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'
import store from './store/index'
 
import 'element-ui/lib/theme-chalk/index.css'
 
import loading from '@//components/CustomComponets/Organize_Choose.js'   // 自定义组件 选择人员组件
Vue.use(loading);    // 自定义组件 选择人员组件

import LeftMenu from '@//components/CustomComponets/LeftMenu.js'   // 自定义组件 选择人员组件
Vue.use(LeftMenu);    // 自定义组件 选择人员组件

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echart=echarts;
Vue.prototype.$axios=axios;
Vue.prototype.$store=store;
axios.interceptors.request.use(
  config => {
      //除登陆接口意外的接口都要加上token，才可以请求接口
      if (!config.url.endsWith('/Login')) {
          if(localStorage.getItem('Token')!=null){
              const token=localStorage.getItem('Token')
              config.headers.common['token']=token
          } 
      } 
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  config => {
    if (config.data==='ReLogin') {
         router.push("/Login");
    } 
    else
    {
      return config;
    }
},
error => {
    return Promise.reject(error);
}
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
