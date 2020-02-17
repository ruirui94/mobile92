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
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast.success('刷新成功')
        this.isLoading = false
        this.onLoad()
      }, 1000)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
