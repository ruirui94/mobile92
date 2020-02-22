<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    closeable
    round
    position="bottom"
    :style="{ height: '20%' }"
    close-icon-position="top-left"
  >
    <!-- 弹出层独立组件 -->
  </van-popup>
</template>

<script>
export default {
  name: 'com-channel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
