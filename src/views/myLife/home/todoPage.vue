<template>
  <div id="app">
    <!-- todos 待办 -->
    <van-nav-bar title="待办列表" />

    <div v-if="todoTypeList">
      <van-tabs
        v-model="active"
        @change="setTypeName"
        sticky
      >
        <van-tab
          v-for="(item,index) in todoTypeList"
          :key="index"
          :title="item.alias || item.title"
          :name="item.name"
        >
          <TodoList
            :typeName="typeName"
            @preAddTodo="preAddTodo"
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
      <AddTodo
        :id="id"
        :index="index"
        v-if="show"
        @closeAddTodo="show = false"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddTodo from '@/components/todo/AddTodo.vue'
import TodoList from '@/components/todo/TodoList.vue'


@Component({
  components: {
    TodoList,
    AddTodo
  }
})
export default class TodoPage extends Vue {
  show = false
  id = ''
  index = -1
  // 手风琴
  active = 0
  typeName: TodoModel.TodoType = 'ongoing'
  // collapseData:TaskModel.TaskData[] = []
  // @tdMd.Action('getTaskByTypeAction')
  // public getTaskByTypeAction!: (taskType?: TaskModel.TaskType) => Array<TaskModel.TaskData>
  // @tnMd.Getter('getTaskNodeList')
  // public taskTypeList!: Array<TaskNodeModel.TaskNodeData>
  todoTypeList = [{
    title: '进行',
    name: 'ongoing',
  }, {
    title: '归档',
    name: 'archive',
  }, {
    title: '常驻',
    name: 'abiding',
  }]

  public async setTypeName(name: TodoModel.TodoType){
    this.typeName = name
  }
  preAddTodo(id = '', index = this.index) {
    this.id = id
    this.index = index
    this.show = true
  }
}
</script>