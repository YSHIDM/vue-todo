<template>
  <div class="todoList">
    <van-tabs v-model="active" @change="getCollapseData" sticky>
      <van-tab
      v-for="(item,index) in todoNode"
      :key="index"
      :title="item.alias || item.title"
      :name="item.name"
      >
        <MyCollapse :collapseData="collapseData" @preAddTodo="preAddTodo"/>
      </van-tab>
    </van-tabs>

    <div style="height: 30px;"></div>
    <table style="width: 100%; position:fixed;bottom: 50px">
      <tr>
        <td>
          <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">手风琴</van-button>
        </td>
        <td>
          <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">全部展开</van-button>
        </td>
        <td>
          <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">全部折叠</van-button>
        </td>
        <td>
          <van-button type="primary" @click="preAddTodo('', -1)" size="mini" v-if="active!='done'">新建待办</van-button>
        </td>
      </tr>
    </table>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%',width: '50%' }"
    >
      <AddTodo :id="id" :index="index" v-if="show" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {namespace} from "vuex-class";
import MyCollapse from '@/components/MyCollapse.vue'
// import AddTodo from '@/components/AddTodo.vue'

const AddTodo = () => import('@/components/AddTodo.vue')

const tdMd = namespace("todoStore")

@Component({
  components: {
    MyCollapse,
    AddTodo
  }
})
export default class TodoList extends Vue {
  show = false;
  id = '';
  index = -1;

  @tdMd.Action('getAllTodoAction')
  private getAllTodoAction!: () => Promise<Array<TodoModel.TodoData>>
  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>
  active = 0;
  todoNode = [{
    id: '',
    name: 'todo',
    title: '待办',
    alias: '',
  }, {
    id: '',
    name: 'inProgress',
    title: '进行',
    alias: '',
  }, {
    id: '',
    name: 'testing',
    title: '测试',
    alias: '',
  }, {
    id: '',
    name: 'done',
    title: '完成',
    alias: '',
  }]
  collapseData: Array<TodoModel.TodoData>=[];
  async created(){
    if (this.getTodoList().length === 0) {
      await this.getAllTodoAction();
    }
    this.collapseData = this.getTodoList()
  }
  public getCollapseData(name: 'todo' | 'inProgress' | 'testing' | 'done'){
    this.collapseData = this.getTodoList(name)
  }
  preAddTodo(id = '', index = -1) {
    console.log('id, index :>>', id, index)
    this.id = id;
    this.index = index;
    this.show = true;
  }
}
</script>

<style>
td {
  width: 25%;
  text-align: center;
}
</style>
