<template>
  <div>
    <van-field
      readonly
      clickable
      label="待办"
      :value="fieldValue"
      placeholder="选择待办"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        ref="picker"
        show-toolbar
        title="选择待办"
        :columns="selectedOptions"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-field
      v-show="content"
      v-model="content"
      type="textarea"
      name="content"
      label="待办内容"
      placeholder="待办内容"
      readonly
    />
    <table style="width: 100%;" v-if="content">
      <tr>
        <td>
          <van-button type="warning" icon="close" @click="reset" size="small">重置</van-button>
        </td>
        <td>
          <van-button  type="primary" icon="passed" @click="todoNext" size="small">下一步</van-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

const tdMd = namespace("todoStore")
const tnMd = namespace("todoNodeStore")

@Component
export default class TodoPicker extends Vue {
  content = '';
  showPicker = false;
  fieldValue = '';
  cascaderValue = '';

  @tdMd.Getter('getTodoList')
  private getTodoList!: (type?: TodoModel.NodeType) => Array<TodoModel.TodoData>;
  @tnMd.Getter('getTodoNodeList')
  private getTodoNodeList!: Array<TodoNodeModel.TodoNodeData>;
  @tdMd.Action('todoNextAction')
  private todoNextAction!: ({ id, node, index}: {id: string; node: TodoModel.NodeType; index: number}) => Promise<void>

  async todoNext(){
    const { id, node } = (this.$refs.picker as any).getColumnValue(1).todo;
    const index = (this.$refs.picker as any).getColumnIndex(1);
    const todoNextAction = this.todoNextAction
    this.$dialog.confirm({
      title: '进入下一步',
      message: '待办进入下一步骤?'
    })
    .then(async (): Promise<void> => {
      await todoNextAction({ id, node, index })
      this.$notify({ type: 'success', message: '操作成功' })
      this.fieldValue = '';
      this.content = '';
    })
    .catch(() => {
    });
  }
  private reset() {
    this.fieldValue = '';
    this.content = '';
  }
  private onConfirm(value: string[]) {
    this.fieldValue = value.join(' -> ');
    this.showPicker = false;

    const todo = (this.$refs.picker as any).getColumnValue(1).todo
    this.content = todo.content
  }
  private get selectedOptions(): Array<ComponentDataType.SelectedOption> {
    const todoNodeList = this.getTodoNodeList
    return todoNodeList.map(todoNode => {
      const children = this.getTodoList(todoNode.name).map(todo => ({
        text: todo.title,
        todo
      }))
      const item: any = {
        text: todoNode.alias || todoNode.title,
        children
      }
      if (todoNode.name === "done") {
        item.disabled = true
      }
      return item
    })
  }
}
</script>

<style>

</style>