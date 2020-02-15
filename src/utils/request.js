// 1.引入axios 和 bigint
import axios from 'axios'
import JSONBig from 'json-bigint'
// 2.引入vuex
import store from '@/store'
// 3.引入router
import router from '@/router/index.js'

// 3.创建一个新的axios对象（避免对原生axios造成污染）
const instance = axios.create(
  {
    // 3.1 配置公共根地址 baseURL：
    baseURL: 'http://ttapi.research.itcast.cn/',
    // 3.2 配置大数据转换
    transformResponse: [function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }]
  }
)

// 5. 配置请求拦截器：Add a request interceptor
instance.interceptors.request.use(function (config) {
  // 依据vuex判断用户是否已登录（有无token）
  if (store.state.user.token) {
    // 添加请求头：
    config.headers['Authorization'] = `Bearer${store.state.user.token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

// 6.配置响应拦截器：
instance.interceptors.response.use(function (response) {
  // 6.1 封装响应业务数据：（判断 response.data.data || response.data
  try {
    return response.data.data
  } catch (err) {
    return response.data
  }
}, function (error) {
  // 6.2 处理 401 （401状态码的简单处理：）
  if (error.response.status === 401) {
    router.push('/login')
    return new Promise(function () { }) // 空的Promise对象，避免返回错误信息
  }
  return Promise.reject(error);
})

// 4.es6 默认导出：
export default instance