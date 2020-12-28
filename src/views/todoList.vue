<template>
  <div class="todoList">
    <van-nav-bar title="待办列表" />
    <van-tabs v-model="active" @change="getCollapseData" sticky>
      <van-tab
      v-for="(item,index) in todoNode"
      :key="index"
      :title="item.alias || item.title"
      :name="item.name"
      >
        <MyCollapse
          :collapseData="collapseData"
          :accordion="accordion"
          :activeName="activeName"
          @preAddTodo="preAddTodo"
        />
      </van-tab>
    </van-tabs>

    <div style="height: 30px;"></div>
    <!-- <table style="width: 100%; position:fixed;bottom: 50px;background-color: white;">
      <tr>
        <td>
          <van-button type="primary" @click="accordion = !accordion" size="mini">{{text}}</van-button>
        </td>
        <td>
          <van-button type="primary" @click="expandAll" size="mini">全部展开</van-button>
        </td>
        <td>
          <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">全部折叠</van-button>
        </td>
        <td>
          <van-button type="primary" @click="preAddTodo()" size="mini">新建待办</van-button>
        </td>
      </tr>
    </table> -->
    <van-popup
      v-model="show"
      position="left"
      round
      :style="{ height: '100%',width: '80%' }"
    >
      <AddTodo :id="id" :index="index" v-if="show" @closeAddTodo="show = false"/>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import MyCollapse from '@/components/MyCollapse.vue';

const AddTodo = () => import('@/components/AddTodo.vue');

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
  // 手风琴
  accordion = true;
  activeName: number | number[] = 0;

  // expandAll(){
  //   this.activeName = this.collapseData.map((_item, i) => i)//
  // }

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

  private get text(): string {
    return this.accordion ? '手风琴' : '折叠列表'
  }
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
