import { Store } from 'vuex'
import {
  getAllTodoNode, saveTodoNode
} from '@/api/graphql/browse/todoNode'
import { RES_CODE } from "@/api/const"
import { TodoNode, State } from './type.d'

const GET_ALL_TODO_NODE = 'GET_ALL_TODO_NODE'
const SAVE_ALL_TODO_NODE = 'SAVE_ALL_TODO_NODE'

export default {
  namespaced: true,
  state: {
    allTodoNodeList: [],
  } as State,

  getters: {
    getTodoNodeList(state: State) {
      return state.allTodoNodeList
    }
  },

  mutations: {
    [GET_ALL_TODO_NODE](state: State, allTodoNodeList: Array<TodoNode>) {
      state.allTodoNodeList = allTodoNodeList
    },
    [SAVE_ALL_TODO_NODE](state: State, { allTodoNode }: { allTodoNode: Array<TodoNode> }) {
      state.allTodoNodeList = allTodoNode
    },
  },

  actions: {
    // getAllTodo, saveTodo, deleteTodoById, todoNext, todoDone, closeTodo, restoreTodo, todoArchive
    /**
     * 查询所有的角色
     * @param commit
     * @param state
     */
    async getAllTodoNodeAction({ commit }: Store<State>): Promise<any> {
      const { code, data } = await getAllTodoNode()

      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(GET_ALL_TODO_NODE, data)
      return data
    },
    async saveTodoNodeAction({ commit, state }: Store<State>, { todoNode, index }: { todoNode: TodoNode; index: number }) {
      const allTodoNode = state.allTodoNodeList.map(({ alias, title, name }, i) => {
        if (i === index) {
          return { alias: todoNode.alias, title: todoNode.title, name: todoNode.name }
        }
        return { alias, title, name }
      })
      const { code } = await saveTodoNode(todoNode)
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(SAVE_ALL_TODO_NODE, { allTodoNode })
    }
  }
}
