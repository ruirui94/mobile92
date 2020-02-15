import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 统一设置 localStorage 存储用户信息的key名称：
const USER_KEY = 'hm-toutiao-m-user'

export default new Vuex.Store({
  state: {
    // 存储用户信息：
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    // 通过 || 设定 如果localStorage没有数据，就返回空对象
  },
  mutations: {
    // 修改用户信息：
    updateUser (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    // 清除用户信息：
    clearUser (state) {
      state.user = {}
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
