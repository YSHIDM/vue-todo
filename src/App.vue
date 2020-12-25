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
        name: '归档',
        icon: 'star',
        to: 'archiveTodo',
      },
      {
        name: '回收站',
        icon: 'clock',
        to: 'recycle',
      },
      {
        name: '设置',
        icon: 'setting',
        to: 'setting',
      },
    ];
    active = 0;
}
</script>
<style>
</style>
