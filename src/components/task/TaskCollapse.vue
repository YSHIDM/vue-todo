<template>
  <div class="taskcollapse">
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
          <div class="label">任务内容:</div>
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
                  @click="deleteTaskById(id,index)"
                  size="mini"
                >删除</van-button>
              </td>
              <td>

              </td>
              <td>
                <van-button
                  type="primary"
                  icon="revoke"
                  @click="restoreTask(id,index)"
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
                  @click="closeTask(id, node, index)"
                  size="mini"
                >关闭</van-button>
              </td>
              <td></td>
              <td></td>
              <td>
                <van-button
                  type="primary"
                  icon="notes-o"
                  @click="taskArchive(id, index)"
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
                  @click="closeTask(id, node, index)"
                  size="mini"
                >关闭</van-button>
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="edit"
                  @click="preAddTask(id, index)"
                  size="mini"
                >编辑</van-button>
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="passed"
                  @click="taskNext(id, node, index)"
                  size="mini"
                >下一步</van-button>
              </td>
              <td>
                <van-button
                  type="primary"
                  icon="medal-o"
                  @click="taskDone(id, node, index)"
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
            @click="preAddTask()"
            size="mini"
            v-if="!isRecycle"
          >新建任务</van-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import {namespace} from "vuex-class"

const tkMd = namespace("taskStore")

@Component
export default class TaskCollapse extends Vue {
  // @Prop()
  // private collapseData !: TaskModel.TaskData[]
  @Prop()
  private typeName!:TaskModel.TaskType
  @Prop()
  private isRecycle !: boolean


  collapseData:TaskModel.TaskData[] = []
  accordion = true
  activeName: any = 0 // number | number[]
  text = '折叠列表'

  @tkMd.Action('getTaskByTypeAction')
  public getTaskByTypeAction!: (taskType?: TaskModel.TaskType) => Array<TaskModel.TaskData>
  @tkMd.Action('closeTaskAction')
  private closeTaskAction!: ({ id, taskType, index}: {id: string; taskType: TaskModel.TaskType; index: number}) => Promise<void>
  @tkMd.Action('taskNextAction')
  private taskNextAction!: ({ id, taskType, index}: {id: string; taskType: TaskModel.TaskType; index: number}) => Promise<void>
  @tkMd.Action('taskDoneAction')
  private taskDoneAction!: ({ id, taskType, index}: {id: string; taskType: TaskModel.TaskType; index: number}) => Promise<void>
  @tkMd.Action('taskArchiveAction')
  private taskArchiveAction!: ({ id, index}: {id: string; index: number}) => Promise<void>
  @tkMd.Action('restoreTaskAction')
  private restoreTaskAction!: ({ id, index}: {id: string; index: number}) => Promise<void>
  @tkMd.Action('deleteTaskByIdAction')
  private deleteTaskByIdAction!: ({ id, index}: {id: string; index: number}) => Promise<void>

  public isAccordion() {
    this.accordion = !this.accordion
    this.activeName = this.accordion
      ? Math.min(...this.activeName)
      : typeof this.activeName === 'number'
        ? [this.activeName]
        : []
    this.text = this.accordion ? '折叠列表' : '手风琴'
  }
  public expandAll() {
    this.accordion
      ? this.$notify({ type: 'warning', message: '手风琴模式不能全部展开' })
      : this.activeName = this.collapseData.map((_item, i) => i)
  }
  public collapseAll() {
    this.activeName = []
  }
  async closeTask(id: string, taskType: TaskModel.TaskType, index: number){
    const closeTaskAction = this.closeTaskAction
    this.$dialog.confirm({
      title: '关闭任务',
      message: '确认关闭任务?'
    })
    .then(async (): Promise<void> => {
        await closeTaskAction({ id, taskType, index })
        this.$notify({ type: 'success', message: '成功关闭任务' })
      })
    .catch(() => {
    })
  }
  async taskNext(id: string, taskType: TaskModel.TaskType, index: number){
    const taskNextAction = this.taskNextAction
    this.$dialog.confirm({
      title: '进入下一步',
      message: '任务进入下一步骤?'
    })
    .then(async (): Promise<void> => {
      await taskNextAction({ id, taskType, index })
      this.$notify({ type: 'success', message: '操作成功' })
    })
    .catch(() => {
    })
  }
  async taskDone(id: string, taskType: TaskModel.TaskType, index: number){
    const taskDoneAction = this.taskDoneAction
    this.$dialog.confirm({
      title: '完成任务',
      message: '结束任务任务?'
    })
    .then(async (): Promise<void> => {
      await taskDoneAction({ id, taskType, index })
      this.$notify({ type: 'success', message: '任务已完成' })
    })
    .catch(() => { })
  }
  async taskArchive(id: string, index: number){
    await this.taskArchiveAction({ id, index })
    this.$notify({ type: 'success', message: '任务已归档' })
  }
  async restoreTask(id: string, index: number){
    await this.restoreTaskAction({ id, index })
    this.$notify({ type: 'success', message: '任务已还原' })
  }
  async deleteTaskById(id: string, index: number) {
    const deleteTaskByIdAction = this.deleteTaskByIdAction
    this.$dialog.confirm({
      title: '彻底删除',
      message: '彻底删除任务?'
    })
    .then(async (): Promise<void> => {
      await deleteTaskByIdAction({ id, index })
      this.$notify({ type: 'success', message: '任务已彻底删除' })
    })
    .catch(() => { })
  }
  public preAddTask(id: string, index: number) {
    this.$emit('preAddTask', id, index)
  }

  async created(){
    this.collapseData = await this.getTaskByTypeAction(this.typeName)
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
