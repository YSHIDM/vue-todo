<template>
  <div class="addTask">
    <van-nav-bar :title="!id ? '新建任务' : '修改任务'" />
    <van-form @submit="saveTask">
      <van-field
        v-if="task"
        v-model="task.title"
        name="title"
        label="任务标题"
        placeholder="任务标题"
        :rules="[{ required: true, message: '请填写任务标题' }]"
      />
      <van-field
        v-if="task"
        v-model="task.content"
        type="textarea"
        name="content"
        label="任务内容"
        placeholder="任务内容"
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

const tkMd = namespace("taskStore")

@Component
export default class AddTask extends Vue {
  @Prop()
  private id !: string
  @Prop()
  private index !: number
  task = { title: '', content: '' }

  @tkMd.Action('getTaskByIdAction')
  private getTaskByIdAction!: (id: string) => Promise<TaskModel.TaskData>
  @tkMd.Action('saveTaskAction')
  private saveTaskAction!: ({task, index}: {task: TaskModel.TaskData; index: number}) => Promise<TaskModel.TaskData>

  async saveTask(values: any){
    await this.saveTaskAction({task: {...values, id: this.id }, index: this.index as unknown as number})
    let message = '保存成功'
    if (values.id){
      message = '修改成功'
    }
    Notify({ type: 'success', message })
    this.$emit('closeAddTask')
  }
  async created(){
    if (this.id){
      this.task = await this.getTaskByIdAction(this.id)
    }
  }
}
</script>
