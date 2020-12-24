<template>
  <div class="archiveTodo">
    <van-steps direction="vertical" :active="archiveTodoList.length">
      <van-step
      v-for="({ title, content, history }, index) in archiveTodoList"
      :key="index"
      >
        <h3>{{title}}</h3>
        <p>{{content}}</p>
        <van-steps direction="vertical" :active="history.length">
          <van-step v-for="({title:node,time},index) in history"
          :key="index"
          >
            {{node}} -> {{time}}
          </van-step>
        </van-steps>
      </van-step>
    </van-steps>

<!-- <van-steps direction="vertical" :active="0">
  <van-step>
    <h3>【城市】物流状态1</h3>
    <p>2016-07-12 12:40</p>
  </van-step>
  <van-step>
    <h3>【城市】物流状态2</h3>
    <p>2016-07-11 10:00</p>
  </van-step>
  <van-step>
    <h3>快件已发货</h3>
    <p>2016-07-10 09:30</p>
  </van-step>
</van-steps> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import {namespace} from "vuex-class";

const tdMd = namespace("todoStore")

@Component
export default class ArchiveTodo extends Vue {
  archiveTodoList: Array<TodoModel.TodoData>=[];

  @tdMd.Action('getAllTodoAction')
  private getAllTodoAction!: () => Promise<Array<TodoModel.TodoData>>
  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>


  async created(){
    if (this.getTodoList().length === 0) {
      await this.getAllTodoAction();
    }
    this.archiveTodoList = this.getTodoList('archive')
  }

}

</script>

<style>

</style>template