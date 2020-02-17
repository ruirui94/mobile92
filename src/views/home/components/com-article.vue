<template>
  <!-- com-article 组件 -->
  <div class="scroll-wrapper">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
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
          :title="item.title"
        >
          <!-- 通过命名插槽体现label的描述信息 -->
          <template slot="label">
            <span class="custom-title">单元格</span>
            <van-tag type="danger">标签</van-tag>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
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
  data () {
    return {
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
    async getArticleList () {
      // 调用api方法：
      const result = await apiArticleList({ channel_id: this.channelId, timestamp: this.times })
      // console.log(result);
      // this.articleList = result.results
      // 不直接给data数据，先进行返回：
      return result
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast.success('刷新成功')
        this.isLoading = false
        this.onLoad()
      }, 1000)
    },
    async onLoad () {
      // 【延时器】应用：
      await this.$sleep(800)
      // 1.下拉获得文章列表数据：
      const articles = await this.getArticleList()
      if (articles.results.length !== 0) {
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
