// 1.导入axios模块：
import request from '@/utils/request.js'
// 【获取文章评论列表】api
export function apiCommentList ({ articleID, commentID }) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'a', // 获取评论
      source: articleID,
      offset: commentID, // 分页标志
      limit: 10
    }
  })
}