// 1.导入axios模块：
import request from '@/utils/request.js'
// 2.【获取文章列表】创建api 函数：
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
// 创建【对章不喜欢】api函数：
export function apiArticleDislike (articleID) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: articleID
    }
  })
}
// 创建【举报】api函数：
export function apiArticleReport ({ articleID, type, remart = '' }) {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data: {
      target: articleID,
      type, // 对象成员简易赋值  type:type
      remart
    }
  })
}

// 【文章详情】api函数
export function apiArticleDetail (articleID) {
  return request({
    url: '/app/v1_0/articles/' + articleID,
    method: 'get'
  })
}
