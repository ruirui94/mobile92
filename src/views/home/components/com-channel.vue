<template>
  <van-popup
    :value="value"
    @input="$emit('input')"
    closeable
    close-icon-position="top-left"
    round
    position="bottom"
    :style="{ height: '95%' }"
    @close="isEdit=false"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            round
            @click="isEdit=!isEdit"
          >{{isEdit?'完成':'编辑'}}</van-button>
        </div>
      </div>
      <!--van-grid 没有设置column-num属性，默认是4列-->
      <van-grid
        class="channel-content"
        :gutter="10"
        clickable
      >
        <van-grid-item
          v-for="(item,k) in channelList"
          :key="item.id"
          @click="clickChannel(item.id,k)"
        >
          <span
            class="text"
            :style="{color:k===activeChannelIndex?'red':''}"
          >{{item.name}}</span>
          <!-- x号小图标 推荐 上没有x---》k>0 -->
          <van-icon
            v-if="k>0 && isEdit === true"
            class="close-icon"
            name="close"
            @click="userToRest(item.id,k)"
          />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid
        class="channel-content"
        :gutter="10"
        clickable
      >
        <van-grid-item
          v-for="item in restChannel"
          :key="item.id"
          @click="restToUser(item)"
        >
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { apiChannelAll, apiChannelAdd, apiChannelDel } from '@/api/channel.js'
export default {
  name: 'com-channel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channelList: {
      type: Array,
      default: () => [] // 默认值为一个空数组
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isEdit: false, // 编辑按钮的文字显示切换 编辑/完成
      channelAll: [] // 全部频道
    }
  },
  created () {
    this.getAllChannel()
  },
  computed: {
    // 把【剩余频道】
    restChannel () {
      // 把“我的频道”的全部id获得到，以数组格式返回
      const userChannelIds = this.channelList.map(item => {
        return item.id
      })
      // 遍历全部频道，返回不在“我的频道”出现的频道
      const rest = this.channelAll.filter(item => {
        return !userChannelIds.includes(item.id)
      })
      // 返回过滤好的 剩余的频道
      return rest
    }
  },
  methods: {
    // 【频道激活】
    clickChannel (channelID, index) {
      // 【进入编辑状态，执行删除逻辑】：
      if (this.isEdit && index > 0) {
        this.userToRest(channelID, index)
        return false // 停止后续代码执行
      }
      // 弹出层消失：
      this.$emit('input', false)
      // 修改activeChannelIndex
      this.$emit('update:activeChannelIndex', index)
    },
    // 【删除频道】：
    userToRest (channelID, index) {
      this.channelList.splice(index, 1) // 页面
      apiChannelDel(channelID) // localStorage
      // 删除频道下标===剩下频道的长度 即删除的就是最后一个频道
      if (this.channelList.length === index) {
        this.$emit('update:activeChannelIndex', index - 1)
      }
    },
    // channel : item in restChannel 【推荐频道】：
    restToUser (channel) {
      this.channelList.push(channel)
      apiChannelAdd(channel)
    },
    // 获得全部频道
    async getAllChannel () {
      const result = await apiChannelAll()
      // console.log(result);
      this.channelAll = result.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>

