<template>
  <div class="mycollapse">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item
      v-for="({ id, title, content, node, isClose, isArchive, history },index) in collapseData"
      :key="index"
      :title="title"
      :name="index">
        <!-- {{id+content+node+ isArchive}} -->
        待办内容: {{content}} <br>
        阶段开始时间: {{history && history[history.length - 1].time}}
        <!-- <van-cell-group>
          <van-cell title="待办内容" :value="content" />
          <van-cell center title="阶段开始时间" :value="history && history[history.length - 1].time" />
        </van-cell-group> -->

        <div v-if="isClose">
          <!-- delete-o -->
          <van-button type="primary" icon="delete-o" @click="deleteTodoById(id,index)" size="mini">删除</van-button>
          <!-- revoke -->
          <van-button type="primary" icon="revoke" @click="restoreTodo(id,index)" size="mini">还原</van-button>
        </div>
        <div v-else-if="isArchive">
          <!-- close -->
          <van-button type="primary" icon="close" @click="closeTodo(id, node, index)" size="mini">关闭</van-button>
        </div>
        <div v-else-if="node === 'done'">
          <!-- close -->
          <van-button type="primary" icon="close" @click="closeTodo(id, node, index)" size="mini">关闭</van-button>
          <!-- notes-o -->
          <van-button type="primary" icon="notes-o" @click="todoArchive(id, index)" size="mini">归档</van-button>
        </div>
        <div v-else>
          <!-- close -->
          <van-button type="primary" icon="close" @click="closeTodo(id, node, index)" size="mini">关闭</van-button>
          <!-- edit -->
          <van-button type="primary" icon="edit" :to="{ name: 'addTodo', params:{ id, index }}" size="mini">编辑</van-button>
          <!-- passed -->
          <van-button type="primary" icon="passed" @click="todoNext(id, node, index)" size="mini">下一步</van-button>
          <!-- medal-o -->
          <van-button type="primary" icon="medal-o" @click="todoDone(id, node, index)" size="mini">完成</van-button>
          <!-- <vant-link icon="close">123</vant-link> -->
        </div>

      </van-collapse-item>
    </van-collapse>

    <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">手风琴</van-button>
    <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">全部展开</van-button>
    <van-button type="primary" @click="closeTodo(id, node, index)" size="mini">全部折叠</van-button>
    <van-button type="primary" :to="{ name: 'addTodo', params: { id: null } }" size="mini" v-if="!isRecycle">新建待办</van-button>

  </div>
</template>

<script lang="ts">
import { Dialog } from 'vant';
import { Component, Vue, Prop} from 'vue-property-decorator';
import {namespace} from "vuex-class";

const tdMd = namespace("todoStore")

@Component
export default class MyCollapse extends Vue {
  @Prop()
  private collapseData !: string;
  @Prop()
  private isRecycle !: boolean;

  activeName = 0;

  @tdMd.Action('saveTodoAction')
  private saveTodoAction!: ({todo, index}: {todo: TodoModel.TodoData; index: number}) => Promise<TodoModel.TodoData>
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

  private get time(): string {
    console.log(this.collapseData)
    return ''
  }

  async saveTodo(values: any){
    await this.saveTodoAction({todo: values, index: this.$route.params.index as unknown as number})
  }
  async closeTodo(id: string, node: TodoModel.NodeType, index: number){
    const closeTodoAction = this.closeTodoAction
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
      beforeClose(action, done){
        if (action === 'confirm') {
          closeTodoAction({ id, node, index })
          // TODO: 不结束
        } else {
          done();
        }
      },
    })
    .catch(err => console.error(err));
  }
  async todoNext(id: string, node: TodoModel.NodeType, index: number){
    await this.todoNextAction({ id, node, index })
  }
  async todoDone(id: string, node: TodoModel.NodeType, index: number){
    await this.todoDoneAction({ id, node, index })
  }
  async todoArchive(id: string, index: number){
    await this.todoArchiveAction({ id, index })
  }
  async restoreTodo(id: string, index: number){
    await this.restoreTodoAction({ id, index })
  }

}
</script>