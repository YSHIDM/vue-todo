<template>
  <div class="mycollapse">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MyCollapse extends Vue {
  activeName = 0;
  // computed: {

  // }
}
</script>