<template>
  <div>
    <van-nav-bar
      title="待办回收站"
      :fixed="true"
    />
    <div style="height: 46px;"></div>
    <TaskCollapse
      :collapseData="getTodoList('recycle')"
      :isRecycle="true"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TaskCollapse from '@/components/task/TaskCollapse.vue'
import {namespace} from "vuex-class"

const tdMd = namespace("todoStore")

@Component({
  components: {
    TaskCollapse,
  }
})
export default class Recycle extends Vue {
  @tdMd.Getter('getTodoList')
  public getTodoList!: (type?: TodoModel.TodoType) => Array<TodoModel.Todo>
}
</script>
