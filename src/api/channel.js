// 1.导入axios：
import request from '@/utils/request.js'
// 2.创建api函数，并导出：
// 参数：token/设备（自带）--》不写
export function apiChannelList () {
  return request(
    {
      url: '/app/v1_0/user/channels',
      method: 'get'
    }
  )
}
