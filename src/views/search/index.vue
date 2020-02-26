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
    <!-- 联想数据展示： -->
    <!-- 有联想数据，显示；没有，则展示历史数据 -->
    <van-cell-group v-if="suggestionList.length>0">
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
    <!-- 联想历史数据展示： -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <!-- 删除图标： -->
        <van-icon
          @click="isDeleteData=true"
          v-show="!isDeleteData"
          slot="right-icon"
          name="delete"
          style="line-height:inherit"
        ></van-icon>
        <div v-show="isDeleteData">
          <!-- 【历史记录全部删除】 -->
          <span
            @click="delAllSuggest()"
            style="margin-right:10px"
          >全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <!-- 历史联想展示 -->
      <van-cell
        :title="item"
        v-for="(item,key) in suggestHistories"
        :key="key"
      >
        <!-- 关闭（删除）图标 -->
        <van-icon
          v-show="isDeleteData"
          slot="right-icon"
          name="close"
          style="line-height:inherit"
          @click="delSuggest(key)"
        ></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestionList } from '@/api/search.js'
// 声明一个常量【联想-历史】
const SH = 'suggest-histories'
export default {
  name: 'search-index',
  data () {
    return {
      suggestHistories: JSON.parse(localStorage.getItem('suggest-histories')) || [], // 联想历史记录
      isDeleteData: false, // 控制是否进入删除状态
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
    // 【全部历史记录--删除】
    delAllSuggest () {
      this.suggestHistories = [] // 页面
      window.localStorage.removeItem(SH)
    },
    // 【单个记录--删除】
    delSuggest (index) {
      this.suggestHistories.splice(index, 1) // 页面
      window.localStorage.setItem(SH, JSON.stringify(this.suggestHistories)) // 把删除后的历史记录重新本地储存
    },
    /*-------------------------------------*/
    onSearch (keywords) {
      if (!keywords) {
        return false
      } // 无关键字，停止执行（不进行跳转）
      // 路由跳转+传递参数
      let data = new Set(this.suggestHistories) // 创建Set集合，保存 已有历史记录
      data.add(keywords)
      this.suggestHistories = Array.from(data) // 转化为数组保存
      // console.log(this.suggestHistories);

      // 关键字数组保存至localStorage中
      window.localStorage.setItem(SH, JSON.stringify(this.suggestHistories))
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