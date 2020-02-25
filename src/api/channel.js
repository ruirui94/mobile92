// 1.导入axios：
import request from '@/utils/request.js'

/*----------------------本地持久化---------------------*/
import store from '@/store' // 导入vuex模块，以便知道当前用户是否登录系统

// 本地持久化存储频道设置的key(游客 和 登录用户 分别设置)
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KET_VIP = 'hm-channel-vip' // 登录用户Key

// 获得用户频道数据
export function apiChannelList () {
  // 通过Promise封装，通过resolve返回输出具体信息，await修饰就接收到了
  // 因为所有api接口的返回结果都是Promise对象，这样做兼容性更好，应用层代码就不用改了
  return new Promise(async (resolve) => {
    // 判断用户是否登录，并执行不同的key(localStorage)
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL

    // 获取本地频道数据
    const localChannels = localStorage.getItem(key)

    // localStorage内部存储的频道数据样子
    // [{id:xx,name:xx},{id:xx,name:xx}……]

    if (localChannels) {
      // 输出频道数据给外部
      resolve({ channels: JSON.parse(localChannels) })
    } else {
      // 频道没有被缓存
      const result = await request({
        url: '/app/v1_0/user/channels',
        method: 'get'
      })
      // 本地存储频道数据
      localStorage.setItem(key, JSON.stringify(result.channels))
      // 输出频道数据给外部
      resolve(result)
    }
  })
}
/*-------------------------------------------*/
// 2.创建api函数，并导出：
// 参数：token/设备（自带）--》不写
// export function apiChannelList () {
//   return request(
//     {
//       url: '/app/v1_0/user/channels',
//       method: 'get'
//     }
//   )
// }
/*-------------------------------------------*/
// 【全部频道列表】
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
/*-------------------------------------------*/
// 添加频道
export function apiChannelAdd (channel) {
  return new Promise(function (resolve) {
    let key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL // 获取缓存的key
    let localChannels = localStorage.getItem(key) // 获取缓存
    if (localChannels) {
      // 缓存有数据
      let channels = JSON.parse(localChannels)
      channels.push(channel) // 添加
      // 重新写入缓存
      localStorage.setItem(key, JSON.stringify(channels))
      resolve() // 成功执行
    }
  })
}