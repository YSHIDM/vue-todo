<template>
  <div class="todoList">
    <van-nav-bar title="待办列表" />
    <van-tabs
      v-model="active"
      @change="getCollapseData"
      sticky
    >
      <van-tab
        v-for="(item,index) in todoNodeList"
        :key="index"
        :title="item.alias || item.title"
        :name="item.name"
      >
        <MyCollapse
          :collapseData="collapseData(name)"
          @preAddTodo="preAddTodo"
        />
      </van-tab>
    </van-tabs>
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
import { namespace } from "vuex-class"
import MyCollapse from '@/components/MyCollapse.vue'

const AddTodo = () => import('@/components/AddTodo.vue')

const tdMd = namespace("todoStore")
const tnMd = namespace("todoNodeStore")

@Component({
  components: {
    MyCollapse,
    AddTodo
  }
})
export default class TodoList extends Vue {
  show = false
  id = ''
  index = -1
  // 手风琴
  active = 0
  name: 'planning' | 'ongoing' | 'testing' | 'done' = 'planning'

  @tdMd.Getter('getTodoList')
  public collapseData!: (type?: TodoModel.TodoType) => Array<TodoModel.Todo>
  @tnMd.Getter('getTodoNodeList')
  public todoNodeList!: Array<TodoNodeModel.TodoNodeData>

  public getCollapseData(name: 'planning' | 'ongoing' | 'testing' | 'done'){
    this.name = name
  }
  preAddTodo(id = '', index = this.index) {
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
