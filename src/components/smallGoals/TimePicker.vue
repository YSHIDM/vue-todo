<template>
  <div>
    <van-field
      readonly
      clickable
      label="倒计时"
      :value="value"
      placeholder="选择时间"
      @click="show = true"
    />
    <van-popup
      v-model="show"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        title="选择时长"
        :columns="timeOptions"
        @cancel="show = false"
        @confirm="onConfirm"
      >
        <template #columns-top>
          <table style="width: 100%">
            <tr>
              <td>时</td>
              <td>分</td>
              <td>秒</td>
            </tr>
          </table>
        </template>
      </van-picker>
    </van-popup>
    <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      title="选择完整时间"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TimePicker extends Vue {
  value = ''
  show = false

      minDate = new Date(2020, 0, 1)
      maxDate = new Date(2025, 10, 1)
      currentDate = new Date()

  public get timeOptions(){
    return [{
      values: this.getNumStrArray(3000)
    }, {
      values: this.getNumStrArray(12)
    }, {
      values: this.getNumStrArray(31)
    }, {
      values: this.getNumStrArray(24)
    }, {
      values: this.getNumStrArray(60)
    }, {
      values: this.getNumStrArray(60)
    }]
  }

  public onConfirm(value: string[]) {
    this.value = value.join(':')
    const [hour, minute, second] = value
    const time = (hour as unknown as number) * 3600 * 1000
      + (minute as unknown as number) * 60 * 1000
      + (second as unknown as number) * 1000
    this.show = false

    this.$emit('openCountDown', time)
  }
  private getNumStrArray(n: number){
    const arr = []
    for (let i = 0; i < n; i++) {
      arr[i] = i.toString().padStart(2, '0')
    }
    return arr
  }
  // private getDayStrArray(month) {

  // }
}
</script>

<style>
</style>
