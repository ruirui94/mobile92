// 1.导入axios模块：
import request from '@/utils/request.js'

// 2.创建【用户登录】api方法:
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

/**
 * 关注作者
 * @param {target} 被关注用户id
 */
export function apiFollow (target) {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      // 成员简易赋值
      target
    }
  })
}

/**
 * 取消关注作者
 * @param {target} 取消关注用户id
 */
export function apiUnFollow (target) {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}
