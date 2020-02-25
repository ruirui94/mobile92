<template>
  <van-popup
    :value="value"
    @input="$emit('input')"
    closeable
    close-icon-position="top-left"
    round
    position="bottom"
    :style="{ height: '95%' }"
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
          >编辑</van-button>
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
        >
          <span
            class="text"
            :style="{color:k===activeChannelIndex?'red':''}"
          >{{item.name}}</span>
          <!-- <van-icon class="close-icon" name="close" /> -->
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
import { apiChannelAll } from '@/api/channel.js'
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

