import { Store } from 'vuex'
import {
  // saveSpace,
  // batchAdd,
  // deleteSpaceById,
  // getSpaceById,
  // getSpaceWithGoodsById,
  getPage,
} from '@/api/axios/space'
// import { RES_CODE } from "@/api/const"

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
const SET_SPACE_PAGE = 'SET_SPACE_PAGE'

export default {
  namespaced: true,
  state: {
    spaceList: [],
    currentPage: 0,
    totalPages: 0,
  } as SpaceModel.State,

  getters: {
    getFinished: (state: SpaceModel.State) => state.currentPage >= state.totalPages,
  },

  mutations: {
    [SET_CURRENT_PAGE](state: SpaceModel.State, currentPage: number) {
      state.currentPage = currentPage
    },
    [SET_TOTAL_PAGE](state: SpaceModel.State, totalPages: number) {
      state.totalPages = totalPages
    },
    [SET_SPACE_PAGE](state: SpaceModel.State, spaceList: SpaceModel.Space[]) {
      state.spaceList = spaceList
    }
  },

  actions: {
    async getSpacePageAction({ commit }: Store<SpaceModel.State>, {
      search = '', filter = {}, pageSize = 10, currentPage = 1
    }: {
      search?: string; filter?: any; pageSize?: number; currentPage?: number;
    }) {
      const { data } = await getPage({
        search,
        filter,
        pageSize,
        currentPage,
      })
      const { currentPage: _currentPage, totalPages, rows } = data
      console.log(_currentPage, totalPages, rows)
      commit(SET_CURRENT_PAGE, _currentPage)
      commit(SET_TOTAL_PAGE, totalPages)
      commit(SET_SPACE_PAGE, rows)
    },
  }
}