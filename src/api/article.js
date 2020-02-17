// 1.导入axios模块：
import request from '@/utils/request.js'
// 2.创建api 函数：
export function apiArticleList ({ channel_id, timestamp }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id, // 频道id 
      timestamp, // 时间戳
      with_top: 1 // 是否包含置顶 默认：1-包含置顶
    }
  })
}