<template>
  <div class="mycollapse">
    <van-collapse
      v-model="activeName"
      accordion
    >
      <van-collapse-item
      v-for="(todoNode, index) in todoNodeList"
      :key="index"
      :title="todoNode.alias || todoNode.title"
      :name="index"
      >
        <van-form @submit="saveTodoNode">
          <van-field
            v-model="todoNode.id"
            name="id"
            v-show="false"
          />
          <van-field
            v-model="todoNode.title"
            name="title"
            label="节点标题"
            readonly
          />
          <van-field
            v-model="todoNode.alias"
            name="alias"
            label="节点别名"
            placeholder="节点别名"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {namespace} from "vuex-class";

const tnMd = namespace("todoNodeStore")

@Component
export default class TodoNodeList extends Vue {
  activeName: number | number[] = []
  todoNodeList: TodoNodeModel.TodoNodeData[] = [];

  @tnMd.Action('getAllTodoNodeAction')
  private getAllTodoNodeAction!: () => Promise<Array<TodoNodeModel.TodoNodeData>>
  @tnMd.Action('saveTodoNodeAction')
  private saveTodoNodeAction!: ({todoNode, index}: {todoNode: TodoNodeModel.TodoNodeData; index: number}) => Promise<TodoNodeModel.TodoNodeData>
  @tnMd.Getter('getTodoNodeList')
  private getTodoNodeList!: Array<TodoNodeModel.TodoNodeData>

  async saveTodoNode(values: any){
    await this.saveTodoNodeAction({todoNode: values, index: this.$route.params.index as unknown as number})
  }

  async created(){
    if (this.getTodoNodeList.length === 0){
      await this.getAllTodoNodeAction()
    }
    this.todoNodeList = this.getTodoNodeList
  }
}
</script>

<style>
td {
  width: 25%;
  text-align: center;
}
</style>
