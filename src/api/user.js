// 1.导入axios模块：
import request from '@/utils/request.js'

// 2.创建api方法:
export function apiUserlogin ({ mobile, code }) { // 运用es6的解构赋值：
  return request(
    {
      url: '/app/v1_0/authorizations',
      method: 'post',
      data: {
        mobile,
        code
      }
    }
  )
}