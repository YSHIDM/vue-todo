<template>
  <div>
    <audio
      controls="controls"
      hidden
      src="/static/tip.mp3"
      ref="audio"
      currentTime=""
    ></audio>
    <van-count-down
      ref="countDown"
      millisecond
      :time="time"
      :auto-start="false"
      format="HH 时 mm 分 ss 秒 SSS"
      @finish="finish"
    />
    <van-grid clickable>
      <van-grid-item text="开始" icon="play-circle-o" @click="start" />
      <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
      <van-grid-item text="重置" icon="revoke" @click="reset" />
      <van-grid-item text="安静" icon="stop-circle-o" v-show="showStop" @click="stop" />
    </van-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CountDown extends Vue {
  showStop = false;

  @Prop()
  private show!: boolean;
  @Prop()
  private time!: number;

  start() {
    (this.$refs.countDown as any).start();
  }
  pause() {
    (this.$refs.countDown as any).pause();
  }
  reset() {
    (this.$refs.countDown as any).reset();
    this.stop();
  }
  stop() {
    (this.$refs.audio as any).pause();
    this.showStop = false;
  }
  finish() {
    this.$toast('倒计时结束');
    (this.$refs.audio as any).currentTime = 0; // 从头开始播放提示音
    (this.$refs.audio as any).play(); // 播放 ended 结束
    this.showStop = true;
    setTimeout(() => {
      this.stop()
    }, 10000);
  }
}
</script>

<style scoped>
/deep/.van-count-down{
  margin: 1rem;
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
}
</style>