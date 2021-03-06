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

// 【获取用户信息】-个人中心：
export const apiUserInfo = () => {
  return request({
    url: `/app/v1_0/user`,
    method: 'GET'
  })
}

// 【获取用户个人资料信息】
export function apiUserProfile () {
  return request({
    url: '/app/v1_0/user/profile', // 地址
    method: 'get'
  })
}