import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'; // 【懒加载】引入{ Lazyload }
import 'vant/lib/index.css';
import 'amfe-flexible/index.min.js'
// 引入全局css样式文件，覆盖vant设置的样式：
import '@/assets/css/global.css'

// vee-validate功能包的使用
import '@/utils/validate.js'

// 【过滤器】
import * as filters from '@/utils/filters.js'
// 【过滤器】注册：
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Vant);
Vue.use(Lazyload); // 【懒加载】注册懒加载指令

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