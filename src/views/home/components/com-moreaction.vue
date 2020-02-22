<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      closeOnClickOverlay
      @close="isOneLevel=true"
    >
      <!-- 一级内容： -->
      <van-cell-group v-if="isOneLevel">
        <van-cell
          icon="location-o"
          title="不感兴趣"
          @click="articleDislike()"
        />
        <van-cell
          icon="location-o"
          is-link
          title="反馈垃圾内容"
          @click="isOneLevel=false"
        />
        <van-cell
          icon="location-o"
          title="拉黑作者"
        />
      </van-cell-group>
      <!-- 二级内容 -->
      <van-cell-group v-else>
        <van-cell
          icon="arrow-left"
          @click="isOneLevel=true"
        />
        <van-cell
          v-for="item in reportsList"
          :key="item.value"
          :title="item.title"
          icon="location-o"
          @click="articleReport(item.value)"
        />

      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 2.导入【举报】api函数：
// 1.导入【对章不喜欢】api函数：
import { apiArticleDislike, apiArticleReport } from '@/api/article'
export default {
  name: 'com-moreaction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 举报类型：
      reportsList: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ],
      isOneLevel: true
    }
  },
  methods: {
    async articleReport (type) {
      try {
        const obj = { articleID: this.articleID, type }
        await apiArticleReport(obj)
      } catch (err) {
        if (err.response.status === 409) {
          return this.$toast.fail('文章已经被举报过了')
        } else {
          return this.$toast.fail('文章举报失败')
        }
      }
      // 成功提示：
      this.$toast.success('举报成功！')
      // 弹出框消失：
      this.$emit('input', false)
    },
    async articleDislike () {
      const result = await apiArticleDislike(this.articleID)
      // console.log(result)
      // 弹框消失：
      this.$emit('input', false)
      // 删除成功提示：
      this.$toast.success('处理成功！')
      // 调用父组件的方法：
      this.$emit('dislikeSuccess')
    }
  },
}
</script>

<style lang="less" scoped>
</style>
