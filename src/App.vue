<template>
  <div id="app">
    <router-view />
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
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  navigateArray: Array<any> = [
      {
        name: '列表',
        icon: 'todo-list',
        to: 'todoList',
      },
      {
        name: '添加',
        icon: 'add-square',
        to: 'addTodo',
      },
      {
        name: '归档',
        icon: 'star',
        to: 'appHome',
      },
      {
        name: '回收站',
        icon: 'clock',
        to: 'appHome',
      },
      {
        name: '设置',
        icon: 'setting',
        to: 'appHome',
      },
    ];
    active = 0;
}
</script>
<style>
</style>
