<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <!-- 弹出层图标： -->
      <div
        slot="nav-right"
        class="channel-more"
        @click="showChannel= true"
      >
        <!-- 设置弹出层显示 -->
        <van-icon name="wap-nav" />
      </div>
      <!-- 增加div 使得vant插件生效 -->
      <van-tab
        :title="item.name"
        v-for="item in channelList"
        :key="item.id"
      >
        <!-- com-article -->
        <!-- 【推荐文章列表】将频道id传给子组件com-article -->
        <com-article :channelId="item.id"></com-article>
      </van-tab>
    </van-tabs>
    <!-- 频道【弹出层】组件 -->
    <com-channel
      v-model="showChannel"
      :channelList="channelList"
      :activeChannelIndex="activeChannelIndex"
    ></com-channel>
  </div>
</template>

<script>
// 引入【弹出层组件】
import ComChannel from './components/com-channel'
// 【频道列表获取api】
import { apiChannelList } from '@/api/channel.js'
import ComArticle from './components/com-article'
export default {
  name: 'home',
  components: {
    ComChannel,
    ComArticle
  },
  data () {
    return {
      showChannel: false, // 控制频道【弹出层】是否显示
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
// 设置【更多频道】css样式：
.channel-more {
  position: fixed;
  right: 0;
  background-color: #fff;
  line-height: 88px;
  width: 90px;
  text-align: center;
  font-size: 40px;
}
.van-tabs {
  // 弹性布局：
  display: flex;
  // 列方向：
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__wrap {
    width: 90%; /*设置频道列表最大宽度，避免盖住右侧按钮*/
  }
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
