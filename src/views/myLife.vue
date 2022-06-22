<!-- my life -->
<template>
  <div id="app">
    <router-view />
    <div style="height: 50px;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in navigateArray"
        :key="index"
        :icon="item.icon"
        :to="{name:item.to,params:{id:null}}"
      >{{item.name}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

@Component
export default class MyLife extends Vue {
  active = 0
  navigateArray: Array<any> = [
    {
      name: '首页',
      icon: 'smile-o',
      to: 'homePage',
    },
    {
      name: '小目标',
      icon: 'aim',
      to: 'smallGoals',
    },
    {
      name: '设置',
      icon: 'setting-o',
      to: 'setting',
    },
  ]
  async created(){
    // if (this.getTodoList().length === 0) {
      // await this.getAllTodoAction()
    // }
    // if (this.getTodoNodeList.length === 0) {
    //   await this.getAllTodoNodeAction()
    // }
  }
  @Watch('$route')
  async watchRoute(route: any){
    this.navigateArray.forEach((navigate, i) => {
      if (route.name === navigate.to) {
        this.active = i
      }
    })
  }
}

</script>