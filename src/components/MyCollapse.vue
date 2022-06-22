<template>
  <div class="mycollapse">
    <van-collapse
      v-model="activeName"
      :accordion="accordion"
    >
      <van-collapse-item
        v-for="({ id, title, content, node, isClose, history },index) in collapseData"
        :key="index"
        :title="title"
        :name="index"
      >
        <div class="flex">
          <div class="label">待办内容:</div>
          <div class="detail">{{content}}</div>
        </div>
        <div class="flex">
          <p class="label">阶段开始时间:</p>
          <p class="detail">{{history && history[history.length - 1].time}}</p>
        </div>

        <div v-if="isClose">

          <table style="width: 100%">
            <tr>
              <td>
                <van-button
                  type="danger"
                  icon="delete-o"
                  @click="deleteTodoById(id,index)"
                  size="mini"
                >删除</van-button>
              </td>
              <td>

              </td>
              <td>
                <van-button
                  type="primary"
                  icon="revoke"
                  @click="restoreTodo(id,index)"
                  size="mini"
                >还原</van-button>
              </td>
              <td>

              </td>
            </tr>
          </table>
        </div>
        <div v-else-if="node === 'done'">
          <table style="width: 100%">
            <tr>
              <td>
                <van-button
                  type="warning"
                  icon="close"
                  @click="closeTodo(id, node, index)"
                  size="mini"
                >关闭</van-button>
              </td>
              <td></td>
              <td></td>
              <td>
                <van-button
                  type="primary"
                  icon="notes-o"
                  @click="todoArchive(id, index)"
                  size="mini"
                >归档</van-button>
              </td>
            </tr>
          </table>
        </div>
        <div v-else>
          <table style="width: 100%">
            <tr>
              <td>
                <van-button
                  type="warning"
                  icon="close"
                  @click="closeTodo(id, node, index)"
                  size="mini"
                >关闭</van-button>
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="edit"
                  @click="preAddTodo(id, index)"
                  size="mini"
                >编辑</van-button>
                <!-- :to="{ name: 'addTodo', params:{ id, index }}" -->
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="passed"
                  @click="todoNext(id, node, index)"
                  size="mini"
                >下一步</van-button>
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="medal-o"
                  @click="todoDone(id, node, index)"
                  size="mini"
                >完成</van-button>
              </td>
            </tr>
          </table>
        </div>
      </van-collapse-item>
    </van-collapse>
    <table style="width: 100%; position:fixed;bottom: 50px;background-color: white;">
      <tr>
        <td>
          <van-button
            type="info"
            @click="isAccordion"
            icon="exchange"
            size="mini"
          >{{text}}</van-button>
        </td>
        <td>
          <van-button
            type="info"
            @click="expandAll()"
            size="mini"
          >全部展开</van-button>
        </td>
        <td>
          <van-button
            type="info"
            @click="collapseAll()"
            size="mini"
          >全部折叠</van-button>
        </td>
        <td>
          <van-button
            type="info"
            @click="preAddTodo()"
            size="mini"
            v-if="!isRecycle"
          >新建待办</van-button>
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
export default class MyCollapse extends Vue {
  @Prop()
  private collapseData !: TodoModel.TodoData[]
  @Prop()
  private isRecycle !: boolean

  accordion = true
  activeName: any = 0 // number | number[]
  text = '折叠列表'

  @tdMd.Action('closeTodoAction')
  private closeTodoAction!: ({ id, node, index}: {id: string; node: TodoModel.NodeType; index: number}) => Promise<void>
  @tdMd.Action('todoNextAction')
  private todoNextAction!: ({ id, node, index}: {id: string; node: TodoModel.NodeType; index: number}) => Promise<void>
  @tdMd.Action('todoDoneAction')
  private todoDoneAction!: ({ id, node, index}: {id: string; node: TodoModel.NodeType; index: number}) => Promise<void>
  @tdMd.Action('todoArchiveAction')
  private todoArchiveAction!: ({ id, index}: {id: string; index: number}) => Promise<void>
  @tdMd.Action('restoreTodoAction')
  private restoreTodoAction!: ({ id, index}: {id: string; index: number}) => Promise<void>
  @tdMd.Action('deleteTodoByIdAction')
  private deleteTodoByIdAction!: ({ id, index}: {id: string; index: number}) => Promise<void>

  private isAccordion() {
    this.accordion = !this.accordion
    this.activeName = this.accordion
      ? Math.min(...this.activeName)
      : typeof this.activeName === 'number'
        ? [this.activeName]
        : []
    this.text = this.accordion ? '折叠列表' : '手风琴'
  }
  private expandAll() {
    this.accordion
      ? this.$notify({ type: 'warning', message: '手风琴模式不能全部展开' })
      : this.activeName = this.collapseData.map((_item, i) => i)
  }
  private collapseAll() {
    this.activeName = []
  }

  async closeTodo(id: string, node: TodoModel.NodeType, index: number){
    const closeTodoAction = this.closeTodoAction
    this.$dialog.confirm({
      title: '关闭待办',
      message: '确认关闭待办?'
    })
    .then(async (): Promise<void> => {
        await closeTodoAction({ id, node, index })
        this.$notify({ type: 'success', message: '成功关闭待办' })
      })
    .catch(() => {
    })
  }
  async todoNext(id: string, node: TodoModel.NodeType, index: number){
    const todoNextAction = this.todoNextAction
    this.$dialog.confirm({
      title: '进入下一步',
      message: '待办进入下一步骤?'
    })
    .then(async (): Promise<void> => {
      await todoNextAction({ id, node, index })
      this.$notify({ type: 'success', message: '操作成功' })
    })
    .catch(() => {
    })
  }
  async todoDone(id: string, node: TodoModel.NodeType, index: number){
    const todoDoneAction = this.todoDoneAction
    this.$dialog.confirm({
      title: '完成待办',
      message: '结束待办任务?'
    })
    .then(async (): Promise<void> => {
      await todoDoneAction({ id, node, index })
      this.$notify({ type: 'success', message: '待办已完成' })
    })
    .catch(() => { })
  }
  async todoArchive(id: string, index: number){
    await this.todoArchiveAction({ id, index })
    this.$notify({ type: 'success', message: '待办已归档' })
  }
  async restoreTodo(id: string, index: number){
    await this.restoreTodoAction({ id, index })
    this.$notify({ type: 'success', message: '待办已还原' })
  }
  async deleteTodoById(id: string, index: number) {
    const deleteTodoByIdAction = this.deleteTodoByIdAction
    this.$dialog.confirm({
      title: '彻底删除',
      message: '彻底删除待办?'
    })
    .then(async (): Promise<void> => {
      await deleteTodoByIdAction({ id, index })
      this.$notify({ type: 'success', message: '待办已彻底删除' })
    })
    .catch(() => { })
  }
  public preAddTodo(id: string, index: number) {
    this.$emit('preAddTodo', id, index)
  }
}
</script>

<style scoped >
td {
  width: 25%;
  text-align: center;
}
.flex {
  display: flex;
  /* justify-content: space-between; */
}
.label {
  flex: 1;
  color: #646566;
}
.detail {
  flex: 2;
}
</style>
