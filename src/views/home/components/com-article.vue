<template>
  <!-- com-article 组件 -->
  <div class="scroll-wrapper">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="downSuccessText"
      success-duration="1000"
    >
      <!-- 下拉完毕 提示信息和停留时长 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- {art_id:BigNumber} 模板中使用超大整型数字时，需要用toString()进行转换 -->
        <van-cell
          v-for="item in articleList"
          :key="item.art_id.toString()"
        >
          <span
            slot="title"
            @click="$router.push({name:'article',params:{aid:item.art_id}})"
          >{{item.title}}</span>
          <!-- 通过命名插槽体现label的描述信息 -->
          <template slot="label">
            <van-grid
              :border="false"
              v-if="item.cover.type>0"
              :column-num="item.cover.type"
            >
              <van-grid-item
                v-for="(item2,key2) in item.cover.images"
                :key="key2"
              >
                <van-image
                  fit="cover"
                  :src="item2"
                  width="100"
                  height="100"
                  lazy-load
                >
                </van-image>
              </van-grid-item>
            </van-grid>
            <p>
              <span>作者：{{item.aut_name}}</span>&nbsp;
              <span>评论：{{item.comm_count}}</span>&nbsp;
              <span>时间：{{item.pubdate | formatTime}}</span>&nbsp;
              <!-- 图标按钮设置 -->
              <van-icon
                name="close"
                style="float:right"
                @click.stop="displayDialog(item.art_id.toString())"
              />
              <!-- .stop 阻止事件冒泡 -->
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 使用弹框组件： -->
    <more-action
      v-model="showDialog"
      :articleID="nowArticleID"
      @dislikeSuccess="handleDislikeSuccess"
    ></more-action>
  </div>
</template>

<script>
// 2.导入【弹框组件】
import MoreAction from './com-moreaction.vue'
// 1.导入【推荐文章列表】api 
import { apiArticleList } from '@/api/article.js'
export default {
  name: 'com-article',
  // 接收home传递的频道id
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  components: {
    MoreAction
  },
  data () {
    return {
      downSuccessText: '', // 下拉完成提示信息
      nowArticleID: '', // 不感兴趣文章id
      showDialog: false, // 是否显示弹框
      times: Date.now(), // 时间戳
      articleList: [],// 文章列表
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
    }
  },
  // created () {
  //   // 调用getArticleList方法：
  //   this.getArticleList()
  // },
  methods: {
    handleDislikeSuccess () {
      // 获取【不感兴趣】文章的下标：
      const index = this.articleList.findIndex(
        item => item.art_id.toString() === this.nowArticleID
      )
      // 根据下标删除对应文章：
      this.articleList.splice(index, 1)
    },
    displayDialog (artID) {
      this.showDialog = true
      this.nowArticleID = artID
    },
    async getArticleList () {
      // 调用api方法：
      const result = await apiArticleList({ channel_id: this.channelId, timestamp: this.times })
      // console.log(result);
      // this.articleList = result.results
      // 不直接给data数据，先进行返回：
      return result
    },
    async onRefresh () {
      // 【延时器】
      await this.$sleep(800)
      // 1.下拉获得文章列表数据：
      const articles = await this.getArticleList()
      if (articles.results.length > 0) {
        // 2.把数据从前 追加给articleList 
        this.articleList.unshift(...articles.results)
        this.times = articles.pre_timestamp
        this.downSuccessText = '文章更新成功'
      } else {
        this.downSuccessText = '文章已经是最新的'
      }
      // 4.停止加载状态
      this.isLoading = false;
    },
    async onLoad () {
      // 【延时器】应用：
      await this.$sleep(800)
      // 1.下拉获得文章列表数据：
      const articles = await this.getArticleList()
      if (articles.results.length > 0) {
        // 2.把数据push 追加给articleList 
        this.articleList.push(...articles.results)
        this.times = articles.pre_timestamp
      } else {
        // 3.数据全部加载完成后结束：
        this.finished = true;
      }
      // 4.停止加载状态
      this.loading = false;
    }
  }
}
</script>

<style lang="less" scoped>
// 上拉列表样式：
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
