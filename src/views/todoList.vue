<template>
  <div class="todoList">
    <van-tabs v-model="active">
      <van-tab
      v-for="(item,index) in todoNode"
      :key="index"
      :title="item.alias || item.title">
        <MyCollapse/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyCollapse from '@/components/MyCollapse.vue'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    MyCollapse,
    HelloWorld
  }
})
export default class TodoList extends Vue {
  active = 0;
  todoNode = [{
    id: '',
    name: '',
    title: '待办',
    alias: '',
  }, {
    id: '',
    name: '',
    title: '进行',
    alias: '',
  }, {
    id: '',
    name: '',
    title: '测试',
    alias: '',
  }, {
    id: '',
    name: '',
    title: '完成',
    alias: '',
  }]
  // computed: {

  // }
}
</script>
