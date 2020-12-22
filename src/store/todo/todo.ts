
import { Store } from 'vuex';
import {
  getAllTodo, saveTodo, // deleteTodoById, todoNext, todoDone, invalidateTodo, todoRecycle, todoArchive
} from '@/api/graphql/browse/todo';
import { RES_CODE } from "@/api/const";
import {
  State, AllTodoList, Todo, NodeType
} from './type.d';

// getAllTodo, saveTodo, deleteTodoById, todoNext, todoDone, invalidateTodo, todoRecycle, todoArchive
const GET_ALL_TODO = 'GET_ALL_TODO'; // 修改角色列表
const SAVE_TODO = 'SAVE_TODO'; // 添加角色
const DELETE_TODO_BY_ID = 'DELETE_TODO_BY_ID'; // 更新角色列表
const TODO_NEXT = 'TODO_NEXT'; // 设置角色对应的用户
const TODO_DONE = 'TODO_DONE'; // 修改当前角色主管
const INVALIDATE_TODO = 'INVALIDATE_TODO'; // 删除角色关联人员
const TODO_RECYCLE = 'TODO_RECYCLE'; // 添加角色关联人员
const TODO_ARCHIVE = 'todoArchive'; // 添加角色关联人员

export default {
  namespaced: true,
  state: {
    isInit: false,
    allTodoList: {
      recycle: [],
      archive: [],
      todo: [],
      inProgress: [],
      testing: [],
      done: [],
    },
  } as State,
  mutations: {
    // [INIT_TODO_LIST]() {

    // },
    [GET_ALL_TODO](state: State, allTodoList: AllTodoList) {
      state.allTodoList = allTodoList
    },
    [SAVE_TODO](state: State, { todo }: { todo: Todo }) {
      console.log('before saveTodo', state.allTodoList['todo'])
      state.allTodoList['todo'].unshift(todo)
      console.log('after saveTodo', state.allTodoList['todo'])
    },
    [TODO_NEXT](state: State, { node, index, todo }: { node: NodeType; index: number; todo: Todo }) {
      state.allTodoList[node].splice(index, 1)
      state.allTodoList[todo.node].unshift(todo)
    },
    [INVALIDATE_TODO](state: State, { listType, index, todo }: { listType: NodeType; index: number; todo: Todo }) {
      state.allTodoList[listType].splice(index, 1)
      state.allTodoList['recycle'].unshift(todo)
    },
    [TODO_RECYCLE](state: State, { listType, index, todo }: { listType: NodeType; index: number; todo: Todo }) {
      state.allTodoList['recycle'].splice(index, 1)
      state.allTodoList[listType].unshift(todo)
    },
    [DELETE_TODO_BY_ID](state: State, { index }: { index: number }) {
      state.allTodoList['recycle'].splice(index, 1);
    },
    [TODO_DONE](state: State, { listType, index, todo }: { listType: NodeType; index: number; todo: Todo }) {
      state.allTodoList[listType].splice(index, 1)
      state.allTodoList['done'].unshift(todo)
    },
    [TODO_ARCHIVE](state: State, { index, todo }: { index: number; todo: Todo }) {
      state.allTodoList['done'].splice(index, 1)
      state.allTodoList['archive'].unshift(todo)
    },
  },
  actions: {
    // getAllTodo, saveTodo, deleteTodoById, todoNext, todoDone, invalidateTodo, todoRecycle, todoArchive
    /**
     * 查询所有的角色
     * @param commit
     * @param state
     */
    async getAllTodoAction({ commit, state }: Store<State>): Promise<any> {
      if (state.isInit) {
        return state.allTodoList
      }
      const { code, data } = await await getAllTodo();
      const allTodoList: { [key: string]: Todo[] } = {
        recycle: [],
        archive: [],
        todo: [],
        inProgress: [],
        testing: [],
        done: [],
      };
      data.forEach(todo => {
        if (todo.isRecycle) {
          state.allTodoList.recycle.push(todo);
        } else if (todo.isArchive) {
          allTodoList.archive.push(todo);
        } else if (todo.node === "todo") {
          allTodoList.todo.push(todo);
        } else if (todo.node === "inProgress") {
          allTodoList.inProgress.push(todo);
        } else if (todo.node === "testing") {
          allTodoList.testing.push(todo);
        } else if (todo.node === "done") {
          allTodoList.done.push(todo);
        }
      });
      if (code !== RES_CODE.SUCCESS) {
        return null;
      }
      commit(GET_ALL_TODO, allTodoList);
      state.isInit = true
      return data;
    },
    async saveTodoAction({ commit }: Store<State>, todo: Todo) {
      const { code, data } = await await saveTodo(todo);
      if (code !== RES_CODE.SUCCESS) {
        return null;
      }
      commit(SAVE_TODO, data);
    }
    // async saveTodoAction() {

    // }
  }
}