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
import { Component, Watch, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

const tdMd = namespace("todoStore")
const tnMd = namespace("todoNodeStore")

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
      name: '小目标',
      icon: 'aim',
      to: 'smallGoals',
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

  @tdMd.Action('getAllTodoAction')
  private getAllTodoAction!: () => Promise<Array<TodoModel.TodoData>>
  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>
  @tnMd.Getter('getTodoNodeList')
  private getTodoNodeList!: Array<TodoNodeModel.TodoNodeData>
  @tnMd.Action('getAllTodoNodeAction')
  private getAllTodoNodeAction!: () => Promise<Array<TodoNodeModel.TodoNodeData>>

  async created(){
    if (this.getTodoList().length === 0) {
      await this.getAllTodoAction();
    }
    if (this.getTodoNodeList.length === 0) {
      await this.getAllTodoNodeAction()
    }
  }

  @Watch('$route')
  watchRoute(route: any){
    this.navigateArray.forEach((navigate, i) => {
      if (route.name === navigate.to) {
        this.active = i;
      }
    });
    console.log(this.active)
  }
}
</script>
<style scoped>
/deep/.van-tabbar {
  z-index: 9;
}
</style>
