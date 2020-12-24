<template>
  <div>
    <MyCollapse :collapseData="collapseData" :isRecycle="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyCollapse from '@/components/MyCollapse.vue'
import {namespace} from "vuex-class";

const tdMd = namespace("todoStore")

@Component({
  components: {
    MyCollapse,
  }
})
export default class Recycle extends Vue {
  collapseData: Array<TodoModel.TodoData>=[];

  @tdMd.Action('getAllTodoAction')
  private getAllTodoAction!: () => Promise<Array<TodoModel.TodoData>>
  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>

  async created(){
    if (this.getTodoList().length === 0) {
      await this.getAllTodoAction();
    }
    this.collapseData = this.getTodoList('recycle')
  }
}
</script>
