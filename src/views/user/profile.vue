<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell
        is-link
        title="头像"
        center
      >
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell
        is-link
        title="名称"
        :value="userProfile.name"
      />
      <van-cell
        is-link
        title="性别"
        :value="userProfile.gender===0?'男':'女'"
      />
      <van-cell
        is-link
        title="生日"
        :value="userProfile.birthday"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { apiUserProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      // 用户资料表单对象
      userProfile: {
        photo: '',
        name: '我是华仔',
        // 0 男 1 女
        gender: 0,
        birthday: '1990-01-01'
      }
    }
  },
  created () {
    this.getUserProfile() // 调用获取用户资料的方法
  },
  methods: {
    // 获取用户资料的方法
    async getUserProfile () {
      let result = await apiUserProfile()
      // 将数据赋值给user
      console.log(result);

      this.userProfile = result
    },
    save () {
      // 提示信息：
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>