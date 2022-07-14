import { Store } from 'vuex'
import {
  saveTodo,
  getPage,
  getTodoById,
  deleteTodoById,
  todoArchive,
  todoAbide,
} from '@/api/axios/todo'
import { RES_CODE } from "@/api/const"
import {
  State, Todo, TodoType
} from './type.d'

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
const SET_TODO_PAGE_BY_TYPE = 'SET_TODO_PAGE_BY_TYPE'
const SAVE_TODO = 'SAVE_TODO'
const DELETE_TODO_BY_ID = 'DELETE_TODO_BY_ID'
const TODO_ARCHIVE = 'TODO_ARCHIVE'
const TODO_ABIDE = 'TODO_ABIDE'

export default {
  namespaced: true,
  state: {
    ongoing: {
      currentPage: 0,
      totalPages: 0,
      rows: []
    },
    archive: {
      currentPage: 0,
      totalPages: 0,
      rows: []
    },
    abiding: {
      currentPage: 0,
      totalPages: 0,
      rows: []
    },
    abidingTodoList: {},
  } as State,

  getters: {
    getTodoListByType(state: State): (todoType?: TodoModel.TodoType) => Array<TodoModel.Todo> {
      return (todoType: TodoModel.TodoType = 'ongoing'): Array<TodoModel.Todo> => state[todoType].rows || []
    },
    getAbidingTodoById(state: State): (id: string) => TodoModel.Todo {
      return (id: string): TodoModel.Todo => state.abidingTodoList[id]
    },
    // 按类型获取currentPage
    getCurrentPageByType(state: State): (todoType: TodoType) => number {
      return (todoType: TodoType): number => {
        console.log('getCurrentPageByType', state[todoType].currentPage)
        return state[todoType].currentPage
      }
    },
    // 按类型获取isFinish
    getFinishedPageByType(state: State): (todoType: TodoType) => boolean {
      console.log('getFinishedPageByType')
      return (todoType: TodoType): boolean => state[todoType].currentPage >= state[todoType].totalPages
    }
  },

  mutations: {
    [SET_CURRENT_PAGE](state: State, { todoType, currentPage }: { todoType: TodoType, currentPage: number }) {
      state[todoType].currentPage = currentPage
    },
    [SET_TOTAL_PAGE](state: State, { todoType, totalPages }: { todoType: TodoType, totalPages: number }) {
      state[todoType].totalPages = totalPages
    },
    [SET_TODO_PAGE_BY_TYPE](state: State, { todoType, todoList, isRefresh }: { todoType: TodoType; todoList: Todo[]; isRefresh?: boolean }) {
      if (todoType === 'abiding') {
        todoList.forEach(todo => {
          state.abidingTodoList[todo.id] = todo
        })
      }
      state[todoType].rows = isRefresh ? todoList : state[todoType].rows.concat(todoList)
    },
    [SAVE_TODO](state: State, { todo, index }: { todo: Todo; index: number }) {
      let list: Todo[]
      if (todo.isAbiding) {
        list = state.abiding.rows
      } else {
        list = state.ongoing.rows
      }
      if (index > 0) {
        list.splice(index, 1)
      }
      list.unshift(todo)
      if (todo.isAbiding) {
        state.abidingTodoList[todo.id] = todo
      }
    },
    [DELETE_TODO_BY_ID](state: State, { todoType, index }: { todoType: TodoType; index: number }) {
      state[todoType].rows.splice(index, 1)
    },
    [TODO_ARCHIVE](state: State, { index, todo }: { index: number; todo: Todo }) {
      state.ongoing.rows.splice(index, 1)
      state.archive.rows.unshift(todo)
    },
    [TODO_ABIDE](state: State, { index, todo }: { index: number; todo: Todo }) {
      let list: Todo[]
      if (todo.isArchive) {
        list = state.archive.rows
      } else {
        list = state.ongoing.rows
      }
      if (index > 0) {
        list.splice(index, 1)
      }
      state.abiding.rows.unshift(todo)
    }
  },

  actions: {
    async getTodoPageByTypeAction(
      { commit }: Store<State>,
      {
        search, todoType, currentPage
      }: {
        search?: string; todoType?: TodoType; currentPage?: number
      }
    ): Promise<any> {
      const filter = {
        isArchive: false,
        isAbiding: false,
      }
      if (todoType === 'archive') {
        filter.isArchive = true
      } else if (todoType === 'abiding') {
        filter.isAbiding = true
      }
      const { data } = await getPage({ search, filter, currentPage })
      const { currentPage: _currentPage, totalPages, rows } = data

      // if (code !== RES_CODE.SUCCESS) {
      //   data = []
      // }
      commit(SET_CURRENT_PAGE, { todoType, currentPage: _currentPage })
      commit(SET_TOTAL_PAGE, { todoType, totalPages })
      commit(SET_TODO_PAGE_BY_TYPE, { todoType, todoList: rows, isRefresh: currentPage === 1 })
      // return rows
    },
    async getTodoByIdAction(_State: Store<State>, id: string) {
      const { data } = await getTodoById(id)
      return data
    },
    async saveTodoAction({ commit }: Store<State>, { todo, index }: { todo: Todo; index: number }) {
      const { code, data } = await saveTodo(todo)
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(SAVE_TODO, { todo: data, index })
    },
    async deleteTodoByIdAction({ commit }: Store<State>, { id, todoType, index }: { id: string; todoType: TodoType; index: number }) {
      await deleteTodoById(id)
      commit(DELETE_TODO_BY_ID, { todoType, index })
    },
    async todoArchiveAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: todo } = await todoArchive(id)
      commit(TODO_ARCHIVE, { index, todo })
    },
    async todoAbide({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: todo } = await todoAbide(id)
      commit(TODO_ABIDE, { index, todo })
    }
  }
}
