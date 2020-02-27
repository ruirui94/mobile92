<template>
  <div class="comment">
    <!--van-list：实现瀑布加载效果-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in commentList"
        :key="item.com_id.toString()"
      >
        <!-- 作者头像 -->
        <div slot="icon">
          <img
            class="avatar"
            :src="item.aut_photo"
            alt=""
          >
        </div>
        <!-- 作者名称 -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞 -->
        <div slot="default">
          <van-button
            icon="like-o"
            size="mini"
            plain
            :type="item.is_likeing?'danger':'default'"
          > &nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间 -->
        <div slot="label">
          <p v-html="item.content"></p>
          <p>
            <span>{{item.pubdate | formatTime}}</span>
            ·
            <span @click="openReply(item.com_id.toString())">{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复区域  弹出层/瀑布 -->
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <!-- 瀑布加载效果 -->
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell
          v-for="item in replyList"
          :key="item.com_id.toString()"
        >
          <!-- 作者头像 -->
          <div slot="icon">
            <img
              class="avatar"
              :src="item.aut_photo"
              alt
            >
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>{{item.aut_name}}</span>
          </div>
          <!-- 评论内容和时间 -->
          <div slot="label">
            <p v-html="item.content"></p>
            <p>
              <span>{{item.pubdate | formatTime}}</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
// 1.导入【获取评论】api
import { apiReplyList } from '@/api/reply.js'
import { apiCommentList } from '@/api/comment.js'
export default {
  name: 'com-comment',
  data () {
    return {
      nowComID: null, // 当前被激活评论id
      replyList: [], // 回复列表
      replyID: null, // 回复id（分页标志）
      showReply: false, // 回复弹出层
      // 回复瀑布相关
      reply: {
        list: [],
        loading: false,
        finished: false
      },
      commentList: [], // 评论列表
      commentID: null,
      // 瀑布流相关：
      loading: false,
      finished: false
    }
  },
  computed: {
    // 简化id：
    aid: function () {
      return this.$route.params.aid
    }
  },
  methods: {
    openReply (comID) {
      this.showReply = true // 显示弹出层
      this.nowComID = comID // 设置激活评论
      // 恢复
      this.replyList = [] // 清空回复列表
      this.reply.finished = false // 重置瀑布状态
      this.replyID = null // 重置分页标志
    },
    // 回复瀑布加载
    async onLoadReply () {
      // 暂停0.8秒
      await this.$sleep(800)

      let result = await apiReplyList({ commentID: this.nowComID, replyID: this.replyID })
      console.log(result)

      // 加载动画消失
      this.reply.loading = false

      // 数据加载完成
      if (result.results.length === 0) {
        this.reply.finished = true
        return false
      }
      this.replyList.push(...result.results)
      // 接收replyID
      this.replyID = result.last_id
    },
    async onLoad () {
      // 暂停0.8秒
      await this.$sleep(800)

      let result = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID
      })
      // 加载动画消失
      this.loading = false

      // 数据加载完成
      if (result.results.length === 0) {
        this.finished = true
        return false
      }

      this.commentList.push(...result.results)
      // 接收commentID
      this.commentID = result.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
