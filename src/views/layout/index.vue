<template>
  <div class="container">
    <!-- vant 导航栏 组件： -->
    <van-nav-bar
      v-if="showNavBar"
      fixed
      right-text="搜索"
      title="黑马头条"
      @click-right="$router.push('/search')"
    />
    <!-- <van-icon
        name="search"
        slot="right"
      >搜索</van-icon> -->
    <!-- noTop 设置padding 为0 -->
    <!-- showNavBar 为假的时候为 个人中心：  -->
    <div
      class="my-wrapper"
      :class="{noTop:!showNavBar}"
    >
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
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/video"
        icon="video-o"
      >视频</van-tabbar-item>
      <van-tabbar-item
        :to="userGo"
        icon="user-o"
      >{{$store.state.user.token?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
export default {
  name: 'layout-index',
  computed: {
    showNavBar: function () {
      // 判断是否在访问 个人中心：
      return this.$route.path !== '/user'
    },
    userGo: function () {
      // 根据token状态，是否登录设置跳转路由地址：
      return this.$store.state.user.token ? '/user' : '/login'
    }
  }
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
