import { Store } from 'vuex'
import {
  getAllTodo, saveTodo, getTodoById, closeTodo, todoNext, todoDone, todoArchive, restoreTodo, deleteTodoById
} from '@/api/graphql/browse/todo'
import { RES_CODE } from "@/api/const"
import {
  State, AllTodoList, Todo, NodeType
} from './type.d'

// getAllTodo, saveTodo, deleteTodoById, todoNext, todoDone, closeTodo, restoreTodo, todoArchive
const GET_ALL_TODO = 'GET_ALL_TODO' // 修改角色列表
const SAVE_TODO = 'SAVE_TODO' // 添加角色
const DELETE_TODO_BY_ID = 'DELETE_TODO_BY_ID' // 更新角色列表
const TODO_NEXT = 'TODO_NEXT' // 设置角色对应的用户
const TODO_DONE = 'TODO_DONE' // 修改当前角色主管
const CLOSE_TODO = 'CLOSE_TODO' // 删除角色关联人员
const RESTORE_TODO = 'RESTORE_TODO' // 添加角色关联人员
const TODO_ARCHIVE = 'todoArchive' // 添加角色关联人员

export default {
  namespaced: true,
  state: {
    isInit: false,
    allTodoList: {
      recycle: [],
      archive: [],
      planning: [],
      ongoing: [],
      testing: [],
      done: [],
    },
  } as State,

  getters: {
    getTodoList(state: State): (type?: NodeType) => Array<TodoModel.TodoData> {
      return (type: NodeType = 'planning'): Array<TodoModel.TodoData> => state.allTodoList[type] || []
    }
  },

  mutations: {
    [GET_ALL_TODO](state: State, allTodoList: AllTodoList) {
      state.allTodoList = allTodoList
    },
    [SAVE_TODO](state: State, { todo, index }: { todo: Todo; index: number }) {
      if (index > 0) {
        state.allTodoList[todo.node].splice(index, 1)
      }
      state.allTodoList[todo.node].unshift(todo)
    },
    [TODO_NEXT](state: State, { node, index, todo }: { node: NodeType; index: number; todo: Todo }) {
      state.allTodoList[node].splice(index, 1)
      state.allTodoList[todo.node].unshift(todo)
    },
    [CLOSE_TODO](state: State, { node, index, todo }: { node: NodeType; index: number; todo: Todo }) {
      state.allTodoList[node].splice(index, 1)
      state.allTodoList['recycle'].unshift(todo)
    },
    [RESTORE_TODO](state: State, { index, todo }: { index: number; todo: Todo }) {
      state.allTodoList['recycle'].splice(index, 1)
      const node: NodeType = todo.isArchive ? 'archive' : todo.node
      state.allTodoList[node].unshift(todo)
    },
    [DELETE_TODO_BY_ID](state: State, { index }: { index: number }) {
      state.allTodoList['recycle'].splice(index, 1)
    },
    [TODO_DONE](state: State, { node, index, todo }: { node: NodeType; index: number; todo: Todo }) {
      state.allTodoList[node].splice(index, 1)
      state.allTodoList['done'].unshift(todo)
    },
    [TODO_ARCHIVE](state: State, { index, todo }: { index: number; todo: Todo }) {
      state.allTodoList['done'].splice(index, 1)
      state.allTodoList['archive'].unshift(todo)
    },
  },

  actions: {
    // getAllTodo, saveTodo, deleteTodoById, todoNext, todoDone, closeTodo, restoreTodo, todoArchive
    /**
     * 查询所有的角色
     * @param commit
     * @param state
     */
    async getAllTodoAction({ commit, state }: Store<State>): Promise<any> {
      if (state.isInit) {
        return state.allTodoList
      }
      const { code, data } = await getAllTodo()
      const allTodoList: AllTodoList = {
        recycle: [],
        archive: [],
        planning: [],
        ongoing: [],
        testing: [],
        done: [],
      }
      data.forEach(todo => {
        if (todo.isClose) {
          allTodoList.recycle.push(todo)
        } else if (todo.isArchive) {
          allTodoList.archive.push(todo)
        } else if (todo.node === "planning") {
          allTodoList.planning.push(todo)
        } else if (todo.node === "ongoing") {
          allTodoList.ongoing.push(todo)
        } else if (todo.node === "testing") {
          allTodoList.testing.push(todo)
        } else if (todo.node === "done") {
          allTodoList.done.push(todo)
        }
      })
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(GET_ALL_TODO, allTodoList)
      state.isInit = true
      return data
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
    async closeTodoAction({ commit }: Store<State>, { id, node, index }: { id: string; node: NodeType; index: number }) {
      const { data: todo } = await closeTodo(id)
      commit(CLOSE_TODO, { node, index, todo })
    },
    async todoNextAction({ commit }: Store<State>, { id, node, index }: { id: string; node: NodeType; index: number }) {
      const { data: todo } = await todoNext(id)
      commit(TODO_NEXT, { node, index, todo })
    },
    async todoDoneAction({ commit }: Store<State>, { id, node, index }: { id: string; node: NodeType; index: number }) {
      const { data: todo } = await todoDone(id)
      commit(TODO_DONE, { node, index, todo })
    },
    async todoArchiveAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: todo } = await todoArchive(id)
      commit(TODO_ARCHIVE, { index, todo })
    },
    async restoreTodoAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: todo } = await restoreTodo(id)
      commit(RESTORE_TODO, { index, todo })
    },
    async deleteTodoByIdAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      await deleteTodoById(id)
      commit(DELETE_TODO_BY_ID, { index })
    }
  }
}
