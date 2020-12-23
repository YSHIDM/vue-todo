<template>
  <div class="mycollapse">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item
      v-for="({ id, title, content, node, isClose, isArchive },index) in collapseData"
      :key="index"
      :title="title"
      :name="index">
      <!-- {{id+content+node+ isArchive}} -->
      {{content}}

          <div v-if="isClose">
            <!-- delete-o -->
            <van-button type="primary" icon="delete-o" @click="deleteTodoById(id,index)" size="normal">删除</van-button>
            <!-- revoke -->
            <van-button type="primary" icon="revoke" @click="restoreTodo(id,index)" size="normal">还原</van-button>
          </div>
          <div v-else-if="isArchive">
            <!-- close -->
            <van-button type="primary" icon="close" @onConfirm="closeTodo(id, 'archive', index)" size="normal">关闭</van-button>
          </div>
          <div v-else-if="node === 'done'">
            <!-- close -->
            <van-button type="primary" icon="close" @onConfirm="closeTodo(id, node, index)" size="normal">关闭</van-button>
            <!-- notes-o -->
            <van-button type="primary" icon="notes-o" @click="todoArchive(id, index)" size="normal">归档</van-button>
          </div>
          <div v-else>
            <!-- close -->
            <van-button type="primary" icon="close" @click="closeTodo(id, node, index)" size="normal">关闭</van-button>
            <!-- edit -->
            <van-button type="primary" icon="edit" :to="{ name: 'addTodo', params:{ id }}" size="normal">编辑</van-button>
            <!-- passed -->
            <van-button type="primary" icon="passed" @click="todoNext(id, node, index)" size="normal">下一步</van-button>
            <!-- medal-o -->
            <van-button type="primary" icon="medal-o" @click="todoDone(id, node, index)" size="normal">完成</van-button>
            <!-- <vant-link icon="close">123</vant-link> -->
          </div>

      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class MyCollapse extends Vue {
  @Prop()
  private collapseData !: string;
  activeName = 0;

}
</script>