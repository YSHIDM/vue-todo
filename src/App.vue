<template>
  <div id="app">
    <!-- <router-view />
    <div style="height: 50px;"></div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
<style scoped>
/deep/.van-tabbar {
  z-index: 9;
}
</style>
