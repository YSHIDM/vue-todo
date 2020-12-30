<template>
  <div>
    <van-nav-bar title="一个小目标" :fixed="true" />
    <div style="height: 46px;"></div>
    <TodoPicker/>
    <TimePicker @openCountDown="openCountDown"/>
    <CountDown v-show="showCountDown" :time="time" @closeCountDown="show = false"/>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoPicker from '@/components/smallGoals/TodoPicker.vue';
import TimePicker from '@/components/smallGoals/TimePicker.vue';
import CountDown from '@/components/smallGoals/CountDown.vue';

@Component({
  components: {
    TodoPicker,
    TimePicker,
    CountDown
  }
})
export default class SmallGoals extends Vue {
  showCountDown = false;
  time = 0;

  public openCountDown(time: number) {
    this.time = time;
    if (time > 0) {
      this.showCountDown = true;
    } else {
      this.showCountDown = false;
    }
  }
}
</script>

<style>

</style>
