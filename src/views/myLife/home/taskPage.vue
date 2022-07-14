<template>
  <div>
    <van-nav-bar title="任务列表" />

    <div v-if="taskTypeList">
      <van-tabs
        v-model="active"
        @change="setTypeName"
        sticky
      >
        <van-tab
          v-for="(item,index) in taskTypeList"
          :key="index"
          :title="item.alias || item.title"
          :name="item.name"
        >
          <TaskCollapse
            :typeName="typeName"
            @preAddTask="preAddTask"
          />
        </van-tab>
      </van-tabs>
    </div>
    <div style="height: 30px;"></div>
    <van-popup
      v-model="show"
      position="left"
      round
      :style="{ height: '100%',width: '80%' }"
    >
      <AddTask
        :id="id"
        :index="index"
        v-if="show"
        @closeAddTask="show = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TaskCollapse from '@/components/task/TaskCollapse.vue'
import AddTask from '@/components/task/AddTask.vue'

// const AddTask = () => import('@/components/AddTask.vue')

// const tdMd = namespace("taskStore")
// const tnMd = namespace("taskNodeStore")

@Component({
  components: {
    TaskCollapse,
    AddTask
  }
})
export default class TaskPage extends Vue {
  show = false
  id = ''
  index = -1
  // 手风琴
  active = 0
  typeName: 'planning' | 'ongoing' | 'testing' | 'done' = 'planning'
  taskTypeList = [{
    title: '计划',
    name: 'planning',
  }, {
    title: '进行',
    name: 'ongoing',
  }, {
    title: '测试',
    name: 'testing',
  }, {
    title: '完成',
    name: 'done',
  }, {
    title: '归档',
    name: 'archive',
  }, {
    title: '回收',
    name: 'recycle',
  }]

  public async setTypeName(name: 'planning' | 'ongoing' | 'testing' | 'done'){
    this.typeName = name
  }
  preAddTask(id = '', index = this.index) {
    this.id = id
    this.index = index
    this.show = true
  }
}
</script>
<style>
td {
  width: 25%;
  text-align: center;
}
</style>