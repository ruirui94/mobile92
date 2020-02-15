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
