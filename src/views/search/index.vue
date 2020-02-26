<template>
  <div class="container">
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.back()"
    />
    <van-search
      v-model.trim="searchText"
      placeholder="请输入搜索关键词"
      @search="onSearch(searchText)"
    />
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item,key) in suggestionList"
        :key="key"
        @click="onSearch(item)"
      >
        <!-- 用slot插槽 覆盖原有的title属性 -->
        <span
          slot="title"
          v-html="highlightCell(item,searchText)"
        ></span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestionList } from '@/api/search.js'
export default {
  name: 'search-index',
  data () {
    return {
      suggestionList: [],
      searchText: '' // 搜索关键字
    }
  },
  // watch监听器设置：监听searchText的变化
  watch: {
    searchText: function (newV) {
      if (!newV) {
        this.suggestionList = [] // 清除数据
        return false // 关键字为空 停止后面代码（发送请求）
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const result = await apiSuggestionList({ q: newV })
        // console.log(result);
        this.suggestionList = result.options
      }, 1000)
    }
  },
  methods: {
    onSearch (keywords) {
      if (!keywords) {
        return false
      } // 无关键字，停止执行（不进行跳转）
      // 路由跳转+传递参数
      this.$router.push({ name: 'result', params: { q: keywords } })
    },
    // 搜索【关键字高亮】
    highlightCell (item, keywords) {
      let reg = new RegExp(`${keywords}`, 'i') // 正则，忽略大小写
      let rst = item.match(reg) // 获得到匹配内容

      // 对关键字进行高亮处理
      return item.replace(reg, `<span style="color:red">${rst[0]}</span>`)
    },
  }
}
</script>

<style scoped lang='less'></style>