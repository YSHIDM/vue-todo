<template>
  <div class="archiveTodo">
    <van-nav-bar title="归档待办" :fixed="true" />
    <div style="height: 46px;"></div>
    <van-steps
      direction="vertical"
      :active="getTodoList('archive').length"
    >
      <van-step
      v-for="({ id, title, content, history, createdAt }, index) in getTodoList('archive')"
      :key="index"
      >
        <template #inactive-icon	>
          <van-icon name="good-job" color="green" />
        </template>
        {{createdAt}}
        <h3>标题: {{title}}</h3>
        <p>内容: {{content}}</p>

        <van-steps direction="vertical" :active="history.length">
          <van-step v-for="({title:node,time},index) in history"
          :key="index"
          >
            {{node}} -> {{time}}
          </van-step>
        </van-steps>

        <van-button type="warning" icon="close" @click="closeTodo(id, index)" size="mini">关闭</van-button>
      </van-step>
    </van-steps>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import {namespace} from "vuex-class";

const tdMd = namespace("todoStore")

@Component
export default class ArchiveTodo extends Vue {
  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>
  @tdMd.Action('closeTodoAction')
  private closeTodoAction!: ({ id, node, index}: {id: string; node: TodoModel.NodeType; index: number}) => Promise<void>

  async closeTodo(id: string, index: number){
    const closeTodoAction = this.closeTodoAction
    this.$dialog.confirm({
      title: '关闭待办',
      message: '确认关闭待办?'
    })
    .then(async (): Promise<void> => {
        await closeTodoAction({ id, node: 'archive', index })
        this.$notify({ type: 'success', message: '成功关闭待办' })
      })
    .catch(() => {
    });
  }
}

</script>

<style scoped>
/deep/.van-nav-bar{
  z-index: 9;
}
</style>