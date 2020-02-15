<template>
  <div class="page-user-login">
    <van-nav-bar
      @click-left="$router.back()"
      title="登录"
    ></van-nav-bar>
    <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为父元素来提供外边框。 -->
    <van-cell-group>
      <!-- A.登录校验： -->
      <validation-observer ref="loginFormRef">
        <!-- c.使用ValidationProvider -->
        <!-- name: 报错后的提示 required 必填项 -->
        <validation-provider
          name="手机号"
          rules="required|phone"
          v-slot="{ errors }"
        >
          <van-field
            v-model="loginForm.mobile"
            label="手机号"
            type="tel"
            required
            clearable
            placeholder="请输入手机号码"
            :error-message="errors[0]"
          />
        </validation-provider>
        <validation-provider
          name="验证码"
          rules="required"
          v-slot="{ errors }"
        >
          <van-field
            v-model="loginForm.code"
            label="验证码"
            type="text"
            required
            clearable
            placeholder="请输入验证码"
            :error-message="errors[0]"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
            >发送验证码</van-button>
          </van-field>
        </validation-provider>
      </validation-observer>
    </van-cell-group>
    <div class="login-btn">
      <van-button
        type="info"
        size="small"
        round
        block
        :loading="isLogin"
        loading-text="登录中..."
        @click="login()"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
// a.导入vee-validate：
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// 1.导入api 方法：
import { apiUserlogin } from '@/api/user.js'
export default {
  name: 'user-login',
  // b.注册ValidationProvider：
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      isLogin: false,
      loginForm: {
        // mobile:'',
        // code:''
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async login () {
      const valid = await this.$refs.loginFormRef.validate()
      if (!valid) {
        return false // 校验失败停止后续代码的执行
      }
      // 按钮loading开启：
      this.isLogin = true
      try {
        // 2.调用api方法apiUserlogin
        const result = await apiUserlogin(this.loginForm)
        this.$toast.success('登录成功')
        // 5.调用 vuex 存储token：
        this.$store.commit('updateUser', result)
        // 4.页面跳转到home
        this.$router.push('/home')
      } catch (error) {
        // 3.vant 弹出错误提示方法：
        return this.$toast.fail('手机号或验证码错误' + error)
      }
      // 按钮loading关闭：
      this.isLogin = false
    }
  }
}
</script>

<style scoped lang='less'>
.login-btn {
  padding: 40px;
}
</style>
