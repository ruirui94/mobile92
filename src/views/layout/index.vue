<template>
  <div class="container">
    <!-- vant 导航栏 组件： -->
    <van-nav-bar
      fixed
      right-text="搜索"
      title="黑马头条"
      @click-right="$router.push('/search')"
    />
    <!-- <van-icon
        name="search"
        slot="right"
      >搜索</van-icon> -->
    <div class="my-wrapper">
      <router-view></router-view>
    </div>
    <!-- vant tabbar 标签栏组件： -->
    <van-tabbar route>
      <!-- 路由模式开启后 就不需要配置 v-model -->
      <van-tabbar-item
        to="/home"
        icon="home-o"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/question"
        icon="chat-o"
        dot
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/video"
        icon="video-o"
        info="5"
      >视频</van-tabbar-item>
      <van-tabbar-item
        to="/user"
        icon="user-o"
        info="20"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
export default {
  name: 'layout'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 92px;
    padding-bottom: 100px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
