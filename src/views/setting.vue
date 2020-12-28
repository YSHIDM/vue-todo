<<template>
  <div>
    <van-nav-bar title="待办设置" :fixed="true" />
    <div style="height: 46px;"></div>

    <van-swipe>
      <van-swipe-item>
        <div>
          123123123 <br/>
          123123123 <br/>
          123123123 <br/>
          123123123 <br/>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Setting extends Vue {

  }
</script>

<style scoped>

</style>