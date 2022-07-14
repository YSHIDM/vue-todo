<template>
  <div id="app">
    <!-- spaces 待办 -->
    <van-nav-bar title="空间列表" />

    <SpaceList
      @preAddSpace="preAddSpace"
    />
    <div style="height: 30px;"></div>
    <van-popup
      v-model="show"
      position="left"
      round
      :style="{ height: '100%',width: '80%' }"
    >
      <AddSpace
        :id="id"
        :index="index"
        v-if="show"
        @closeAddSpace="show = false"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SpaceList from '@/components/space/SpaceList.vue'
import AddSpace from '@/components/space/AddSpace.vue'


@Component({
  components: {
    SpaceList,
    AddSpace
  }
})
export default class SpacePage extends Vue {
  show = false
  id = ''
  index = -1

  preAddSpace(id = '', index = this.index) {
    this.id = id
    this.index = index
    this.show = true
  }
}
</script>
