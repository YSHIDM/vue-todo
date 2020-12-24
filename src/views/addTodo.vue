<template>
  <div class="addTodo">
    <van-form @submit="saveTodo">
      <van-field type="text" name="id" v-model="todo.id"/>
      <van-field
        v-model="todo.title"
        name="title"
        label="待办标题"
        placeholder="待办标题"
        :rules="[{ required: true, message: '请填写待办标题' }]"
      />
      <van-field
        v-model="todo.content"
        type="textarea"
        name="content"
        label="待办内容"
        placeholder="待办内容"
        :rules="[{ required: true, message: '请填写待办内容' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Notify } from 'vant';
import { Component, Vue } from 'vue-property-decorator';
import {namespace} from "vuex-class";

const tdMd = namespace("todoStore")

@Component
export default class AddTodo extends Vue {
  todo: any = {};

  @tdMd.Action('getTodoByIdAction')
  private getTodoByIdAction!: (id: string) => Promise<TodoModel.TodoData>
  @tdMd.Action('saveTodoAction')
  private saveTodoAction!: ({todo, index}: {todo: TodoModel.TodoData; index: number}) => Promise<TodoModel.TodoData>

  activeName = 0;
  async saveTodo(values: any){
    await this.saveTodoAction({todo: values, index: this.$route.params.index as unknown as number})
    let message = '保存成功'
    if (values.id){
      message = '修改成功'
    }
    Notify({ type: 'success', message })
  }
  async created(){
    if (this.$route.params.id){
    this.todo = await this.getTodoByIdAction(this.$route.params.id)
    }
  }
}
</script>
