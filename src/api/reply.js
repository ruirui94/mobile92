// 1.导入axios模块：
import request from '@/utils/request.js'
// 2.【回复列表获取】api
export function apiReplyList ({ commentID, replyID }) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'c', // 获取回复
      source: commentID, // 评论id
      offset: replyID,
      limit: 10
    }
  })
}
// 【添加评论或回复】api
export function apiAddCorR ({ target, content, art_id = null }) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target,
      content,
      art_id
    }
  })
}