import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index.min.js'
// 引入全局css样式文件，覆盖vant设置的样式：
import '@/assets/css/global.css'

// vee-validate功能包的使用
import '@/utils/validate.js'

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 【文章列表获取 【延时器】 】：
// 1.创建一个Vue成员
Vue.prototype.$sleep = time => {
  // 返回一个Promise对象，从而可以设置async/await 将异步变为同步：
  return new Promise((resolve) => {
    // 设置一个定时器：
    window.setTimeout(() => {
      resolve() // 无实质数据，应用端无需接收
    }, time);
  })
}