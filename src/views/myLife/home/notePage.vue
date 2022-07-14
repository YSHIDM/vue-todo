<template>
  <div id="app">
    note 笔记
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @close="onClose1"/>
      <van-dropdown-item v-model="value2" :options="option2" @close="onClose2"/>
    </van-dropdown-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
    }
  },
  methods: {
    onClose1() {
      console.log(this.value1)
    },
    onClose2() {
      console.log(this.value2)
    }
  }
}
</script>
