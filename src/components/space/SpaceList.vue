<template>
  <div class="spacelist">
    <van-pull-refresh v-model="loading" @refresh="getPage">
      <van-list
        v-model="loading"
        :finished="getFinished"
        finished-text="没有更多了"
        @load="getPage(currentPage + 1)"
      >
        <van-cell v-for="item in spaceList" :key="item.id" :title="item.name" @click="test"/>
      </van-list>
    </van-pull-refresh>
    <table style="width: 100%; position:fixed;bottom: 50px;background-color: white;">
      <tr>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
          <van-button
            type="info"
            @click="preAddSpace()"
            size="mini"
          >新建任务</van-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import {namespace} from "vuex-class"

const tdMd = namespace("spaceStore")

@Component
export default class SpaceList extends Vue {

  show = true
  loading = false
  finished = false

  @tdMd.State('spaceList')
  spaceList!: SpaceModel.Space[]
  @tdMd.State('currentPage')
  currentPage!: number
  @tdMd.Getter("getFinished")
  getFinished!: boolean

  @tdMd.Action('getSpacePageAction')
  public getSpacePageAction!:({
    search, filter, pageSize, currentPage
  }: {
    search?: string; filter?: any; pageSize?: number; currentPage?: number;
  })=>Promise<SpaceModel.Space[]>
  @tdMd.Action('getSpaceByIdAction')
  public getSpaceByIdAction!:(id: string)=>Promise<SpaceModel.Space>
  @tdMd.Action('deleteSpaceByIdAction')
  public deleteSpaceByIdAction!:({ id, index }: { id: string; index: number })=>Promise<void>
  @tdMd.Action('spaceArchiveAction')
  public spaceArchiveAction!:({ id, index }: { id: string; index: number })=>Promise<void>
  @tdMd.Action('spaceAbide')
  public spaceAbide!:({ id, index }: { id: string; index: number })=>Promise<void>

  test() {
    console.log('123 :>>', 123)
    // this.$router.push('/')
  }

  async created() {
    await this.getPage()
  }
  async getPage(currentPage = 1) {
    console.log('currentPage :>>', currentPage)
    await this.getSpacePageAction({currentPage})
    this.loading = false
  }

  async spaceArchive(id: string, index: number){
    await this.spaceArchiveAction({ id, index })
    this.$notify({ type: 'success', message: '任务已归档' })
  }
  // onConfirm(){
  //   this.$dialog.confirm({
  //     title: '进入下一步',
  //     message: '待办进入下一步骤?'
  //   })
  //   .then(async (): Promise<void> => {
  //     this.$notify({ type: 'success', message: '归档' })
  //   })
  //   .catch(() => {
  //     this.$notify({ type: 'success', message: '删除' })
  //   })
  // }
  onCancel(){
  }
  onRefresh(){
  }
  onLoad(){

  }
  public preAddSpace(id: string, index: number) {
    this.$emit('preAddSpace', id, index)
  }
}
</script>