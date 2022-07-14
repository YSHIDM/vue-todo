<template>
  <div class="addTodo">
    <van-nav-bar :title="!id ? '新建待办' : '修改待办'" />
    <van-form @submit="saveTodo">
      <van-field
        v-if="todo"
        v-model="todo.title"
        name="title"
        label="待办标题"
        placeholder="待办标题"
        :rules="[{ required: true, message: '请填写待办标题' }]"
      />
      <van-field
        v-if="todo"
        v-model="todo.content"
        type="textarea"
        name="content"
        label="待办内容"
        placeholder="待办内容"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Notify } from 'vant'
import { Component, Vue, Prop} from 'vue-property-decorator'
import { namespace } from "vuex-class"

const tdMd = namespace("todoStore")

@Component
export default class AddTodo extends Vue {
  @Prop()
  private id !: string
  @Prop()
  private index !: number
  todo = { title: '', content: '' }

  @tdMd.Action('getTodoByIdAction')
  private getTodoByIdAction!: (id: string) => Promise<TodoModel.Todo>
  @tdMd.Action('saveTodoAction')
  private saveTodoAction!: ({todo, index}: {todo: TodoModel.Todo; index: number}) => Promise<TodoModel.Todo>

  activeName = 0
  async saveTodo(values: any){
    await this.saveTodoAction({todo: {...values, id: this.id }, index: this.index as unknown as number})
    let message = '保存成功'
    if (values.id){
      message = '修改成功'
    }
    Notify({ type: 'success', message })
    this.$emit('closeAddTodo')
  }
  async created(){
    if (this.id){
      // this.todo =
      await this.getTodoByIdAction(this.id)
    }
  }
}
</script>
