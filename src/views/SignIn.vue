<template>
  <div>
    <p class="title">登录</p>
    <van-image
      round
      width="6rem"
      height="6rem"
      src="/static/images/anchor.jpg"
    />
    <van-form>
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="onSubmit"
        >登录</van-button>
      </div>
      <div class="reg">
        <div @click="toRegister">没有账号？立即注册</div>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Toast } from 'vant'
  import { getPublicEncryptData } from '@/libs/util'
  import { namespace } from 'vuex-class'

  const userMd = namespace("userStore")

  @Component
  export default class SignIn extends Vue{
    nickname = 'YSHI'
    password = '12345678'
    // publicKey = '' // 存储位置修改了 -> store

    @userMd.Action('getPublicKeyAction')
    private getPublicKeyAction!: () => Promise<string>
    @userMd.Action('signInAction')
    private signInAction!: (user:{nickname:string, encryptPassword:string}) => Promise<void>
    @userMd.State('publicKey')
    private publicKey!: string
    async created() {
      if (!this.publicKey) {
        await this.getPublicKeyAction()
      }
    }
    async onSubmit() {
      if (this.nickname === '' || this.password === ''){
        Toast('请输入账号或密码')
        return
      }
      const encryptPassword = getPublicEncryptData(this.password, this.publicKey)
      await this.signInAction({nickname: this.nickname, encryptPassword})
      this.$router.push('/homePage')
    }
      toRegister(){
          this.$router.push('/signUp')
      }
  }

  // export default {
  //   methods: {
  //     toRegister(){
  //         this.$router.push('/Register')
  //     }
  //   }
  // }

</script>

<style scoped>
    .title {
        /* border-radius: 15px; */
        size:1px;
        height: 50px;
        line-height: 50px;
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
    }

</style>
