<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <!-- 增加div 使得vant插件生效 -->
      <van-tab
        :title="item.name"
        v-for="item in channelList"
        :key="item.id"
      >
        <!-- com-article -->
        <com-article></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 【频道列表获取api】
import { apiChannelList } from '@/api/channel.js'
import ComArticle from './components/com-article'
export default {
  name: 'home',
  components: {
    ComArticle
  },
  data () {
    return {
      channelList: [], // 频道
      activeChannelIndex: 0
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    async getChannelList () {
      const result = await apiChannelList()
      // console.log(result);
      this.channelList = result.channels
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  // 弹性布局：
  display: flex;
  // 列方向：
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
