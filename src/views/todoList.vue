<template>
  <div class="todoList">
    <van-tabs v-model="active" @change="getCollapseData">
      <van-tab
      v-for="(item,index) in todoNode"
      :key="index"
      :title="item.alias || item.title"
      :name="item.name"
      >
        <MyCollapse :collapseData="collapseData"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {namespace} from "vuex-class";
import MyCollapse from '@/components/MyCollapse.vue'

const tdMd = namespace("todoStore")

@Component({
  components: {
    MyCollapse,
  }
})
export default class TodoList extends Vue {

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
}
</script>
