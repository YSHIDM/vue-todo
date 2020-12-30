<<template>
  <div>
    <van-nav-bar title="待办设置" :fixed="true" />
    <div style="height: 46px;"></div>
    <TodoNodeList/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  const TodoNodeList = () => import('@/components/TodoNodeList.vue');

@Component({
  components: {
    TodoNodeList
  }
})
  export default class Setting extends Vue {

  }
</script>
