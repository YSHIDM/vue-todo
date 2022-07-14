<template>
  <div class="todolist">

    <!-- <van-dialog class="" confirm-button-text="归档" cancel-button-text="删除" title="这里是标题"
      show-cancel-button v-model="show" @confirm="onConfirm" @cancel="onCancel" v-cloak> -->
    <!-- </van-dialog> -->

    <van-pull-refresh v-model="loading" @refresh="getPage">
      <van-list
        v-model="loading"
        :finished="getFinishedPageByType(this.typeName)"
        finished-text="没有更多了"
        @load="getPage(getCurrentPageByType(typeName) + 1)"
      >
        <van-cell v-for="item in todoList" :key="item.id" :title="item.title"/>
      </van-list>
    </van-pull-refresh>
    <table style="width: 100%; position:fixed;bottom: 50px;background-color: white;">
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
          <van-button
            type="info"
            @click="preAddTodo()"
            size="mini"
          >新建任务</van-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import {namespace} from "vuex-class"

const tdMd = namespace("todoStore")

@Component
export default class TodoCollapse extends Vue {

  @Prop()
  private typeName!:TodoModel.TodoType

  show = true
  loading = false
  finished = false

  @tdMd.Getter('getCurrentPageByType')
  getCurrentPageByType!: (todoType: TodoModel.TodoType) => number
  @tdMd.Getter('getFinishedPageByType')
  getFinishedPageByType!: (todoType: TodoModel.TodoType) => boolean

  @tdMd.Action('getTodoPageByTypeAction')
  public getTodoPageByTypeAction!:({
    search, todoType, currentPage, isRefresh
  }: {
    search?: string; todoType?: TodoModel.TodoType; currentPage?: number, isRefresh?: boolean
  })=>Promise<TodoModel.Todo[]>
  @tdMd.Action('getTodoByIdAction')
  public getTodoByIdAction!:(id: string)=>Promise<TodoModel.Todo>
  @tdMd.Action('deleteTodoByIdAction')
  public deleteTodoByIdAction!:({ id, todoType, index }: { id: string; todoType: TodoModel.TodoType; index: number })=>Promise<void>
  @tdMd.Action('todoArchiveAction')
  public todoArchiveAction!:({ id, index }: { id: string; index: number })=>Promise<void>
  @tdMd.Action('todoAbide')
  public todoAbide!:({ id, index }: { id: string; index: number })=>Promise<void>
  @tdMd.Getter('getTodoListByType')
  private getTodoListByType!: (typeName: string) => TodoModel.Todo[]

  async created() {
    await this.getPage()
  }
  async getPage(currentPage = 1) {
    await this.getTodoPageByTypeAction({todoType: this.typeName, currentPage})
    this.loading = false
  }
  get todoList(): TodoModel.Todo[]{
    return this.getTodoListByType(this.typeName) || []
  }
  async todoDone(){

  }

  async todoArchive(id: string, index: number){
    await this.todoArchiveAction({ id, index })
    this.$notify({ type: 'success', message: '任务已归档' })
  }
  // onConfirm(){
  //   this.$dialog.confirm({
  //     title: '进入下一步',
  //     message: '待办进入下一步骤?'
  //   })
  //   .then(async (): Promise<void> => {
  //     this.$notify({ type: 'success', message: '归档' })
  //   })
  //   .catch(() => {
  //     this.$notify({ type: 'success', message: '删除' })
  //   })
  // }
  onCancel(){
  }
  onRefresh(){
  }
  onLoad(){

  }
  public preAddTodo(id: string, index: number) {
    this.$emit('preAddTodo', id, index)
  }
}
</script>