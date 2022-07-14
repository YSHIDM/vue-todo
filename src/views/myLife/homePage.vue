<template>
  <div id="app">
    <van-nav-bar title="首页" />
    <!-- 首页 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item,index) in appList"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        :to="item.to"
      />
      <van-grid-item
        icon="search"
        text="必应"
        url="https://www.bing.com"
      />
    </van-grid>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {
  appList = [{
    icon: 'underway-o',
    text: '任务',
    to: '/taskPage'
  }, {
    icon: 'todo-list-o',
    text: '待办',
    to: '/todoPage'
  }, {
    icon: 'notes-o',
    text: '速记',
    to: '/notePage'
  }, {
    icon: 'bag-o',
    text: '空间',
    to: '/spacePage'
  }, {
    icon: 'flower-o',
    text: '物品',
    to: '/goodsPage'
  }, {
    icon: 'ellipsis',
    text: '其他',
    to: ''
  }, {
    icon: 'comment-o',
    text: '评论',
    to: ''
  }, {
    icon: 'location-o',
    text: '刻舟',
    to: ''
  }, {
    icon: 'chat-o',
    text: '聊天',
    to: ''
  }]
  async created(){
    // if (this.getTodoList().length === 0) {
    //   await this.getAllTodoAction()
    // }
    // if (this.getTodoNodeList.length === 0) {
    //   await this.getAllTodoNodeAction()
    // }
  }
  // @Watch('$route')
  // async watchRoute(route: any){

  // }
}

</script>