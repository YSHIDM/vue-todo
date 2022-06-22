<template>
  <div>
    <div
      class="icon-back"
      @click="tologin"
    >
      <van-icon
        size="25"
        name="arrow-left"
      />
    </div>
    <div>
      <p class="title">登录</p>
    </div>
    <van-form>
      <!-- <van-field
        name="uploader"
        label="上传头像"
      >
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field> -->
      <van-cell-group>
        <van-field
          v-model="nickname"
          required
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="password"
          required
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          v-model="password1"
          required
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
        />
      </van-cell-group>
    </van-form>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        @click="onsubmit"
      >注册</van-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Toast } from 'vant'
  import { getPublicEncryptData } from '@/libs/util'
  import { namespace } from 'vuex-class'

  const userMd = namespace("userStore")

  @Component
  export default class SignUp extends Vue{
    nickname = ''
    password = ''
    password1 = ''
    // uploader = [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }]

    @userMd.Action('signUpAction')
    private signUpAction!: (user:{nickname:string, encryptPassword:string}) => Promise<void>
    @userMd.State('publicKey')
    private publicKey!: string

    tologin(){
      this.$router.go(-1)
    }
    async onsubmit(){
      if (this.nickname === '' || this.password === '' || this.password1 === ''){
        Toast('注册失败！信息未完善')
      } else if (this.password !== this.password1){
        Toast('密码输入两次不一致！')
      } else {
        Toast.success('注册成功')
      // publicKey 的存储位置修改了 -> store
      const encryptPassword = getPublicEncryptData(this.password, this.publicKey)
      await this.signUpAction({nickname: this.nickname, encryptPassword})
      this.$router.push('/myLife')
      }
    }
  }
</script>

<style scoped>
    .icon-back{
        position: absolute;
        left: 2px;
        top:15px
    }
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