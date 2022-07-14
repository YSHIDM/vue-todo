import { Store } from 'vuex'
import {
  saveTask,
  getTaskById,
  deleteTaskById,
  taskNext,
  taskDone,
  closeTask,
  restoreTask,
  taskArchive,
  getTaskByNode,
  getArchiveTask,
  getCloseTask,
} from '@/api/axios/task'
import { RES_CODE } from '@/api/const'
import {
  TaskType,
  State,
  Task,
} from './type.d'

const GET_TASK_BY_TYPE = 'GET_TASK_BY_TYPE'
const SAVE_TASK = 'SAVE_TASK' // 添加角色
const DELETE_TASK_BY_ID = 'DELETE_TASK_BY_ID' // 更新角色列表
const TASK_NEXT = 'TASK_NEXT' // 设置角色对应的用户
const TASK_DONE = 'TASK_DONE' // 修改当前角色主管
const CLOSE_TASK = 'CLOSE_TASK' // 删除角色关联人员
const RESTORE_TASK = 'RESTORE_TASK' // 添加角色关联人员
const TASK_ARCHIVE = 'TASK_ARCHIVE' // 添加角色关联人员
export default {
  namespaced: true,
  state: {
    allTaskList: {
      recycle: [],
      archive: [],
      planning: [],
      ongoing: [],
      testing: [],
      done: [],
    },
  } as State,
  getters: {
    getTaskList(state: State): (taskType?: TaskType) => Array<TaskModel.TaskData> {
      return (taskType: TaskType = 'planning'): Array<TaskModel.TaskData> => state.allTaskList[taskType] || []
    }
  },
  mutations: {
    [GET_TASK_BY_TYPE](state: State, { taskType, taskList }: { taskType: TaskType, taskList: Task[] }) {
      state.allTaskList[taskType] = taskList
    },
    [SAVE_TASK](state: State, { task, index }: { task: Task, index: number }) {
      if (index > 0) {
        // 修改，替换
        state.allTaskList[task.node].splice(index, 1)
      }
      state.allTaskList[task.node].unshift(task)
    },
    [DELETE_TASK_BY_ID](state: State, index: number) {
      state.allTaskList['recycle'].splice(index, 1)
    },
    [TASK_NEXT](state: State, { taskType, index, task }: { taskType: TaskType; index: number; task: Task }) {
      state.allTaskList[taskType].splice(index, 1)
      state.allTaskList[task.node].unshift(task)
    },
    [TASK_DONE](state: State, { taskType, index, task }: { taskType: TaskType; index: number; task: Task }) {
      state.allTaskList[taskType].splice(index, 1)
      state.allTaskList['done'].unshift(task)
    },
    [CLOSE_TASK](state: State, { taskType, index, task }: { taskType: TaskType; index: number; task: Task }) {
      console.log('taskType, index, task :>>', taskType, index, task)
      console.log('state.allTaskList[taskType] :>>', state.allTaskList[taskType])
      console.log(state.allTaskList['recycle'])
      state.allTaskList[taskType].splice(index, 1)
      state.allTaskList['recycle'].unshift(task)
    },
    [RESTORE_TASK](state: State, { task, index }: { task: Task, index: number }) {
      state.allTaskList['recycle'].splice(index, 1)
      const node: TaskType = task.isArchive ? 'archive' : task.node
      state.allTaskList[node].unshift(task)
    },
    [TASK_ARCHIVE](state: State, { task, index }: { task: Task, index: number }) {
      state.allTaskList['done'].splice(index, 1)
      state.allTaskList['archive'].unshift(task)
    },
  },
  actions: {
    async getTaskByTypeAction({ commit }: Store<State>, taskType: TaskType) {
      // if (state.allTaskList[taskType].length !== 0) {
      //   return state.allTaskList[taskType]
      // }
      let result: any
      let resCode: number
      if (taskType === 'archive') {
        const { data, code } = await getArchiveTask()
        result = data
        resCode = code
      } else if (taskType === 'recycle') {
        const { data, code } = await getCloseTask()
        result = data
        resCode = code
      } else {
        const { data, code } = await getTaskByNode(taskType)
        result = data
        resCode = code
      }
      if (resCode !== RES_CODE.SUCCESS) {
        result = []
      }
      // state.allTaskList[taskType] = result
      commit(GET_TASK_BY_TYPE, { taskType, taskList: result })
      return result
    },
    async getTaskByIdAction(_State: Store<State>, id: string) {
      const { data } = await getTaskById(id)
      return data
    },
    async saveTaskAction({ commit }: Store<State>, { task, index }: { task: Task; index: number }) {
      const { code, data } = await saveTask(task)
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(SAVE_TASK, { task: data, index })
    },
    async closeTaskAction({ commit }: Store<State>, { id, taskType, index }: { id: string; taskType: TaskType; index: number }) {
      const { data: task } = await closeTask(id)
      commit(CLOSE_TASK, { taskType, index, task })
    },
    async taskNextAction({ commit }: Store<State>, { id, taskType, index }: { id: string; taskType: TaskType; index: number }) {
      const { data: task } = await taskNext(id)
      commit(TASK_NEXT, { taskType, index, task })
    },
    async taskDoneAction({ commit }: Store<State>, { id, taskType, index }: { id: string; taskType: TaskType; index: number }) {
      const { data: task } = await taskDone(id)
      commit(TASK_DONE, { taskType, index, task })
    },
    async taskArchiveAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: task } = await taskArchive(id)
      commit(TASK_ARCHIVE, { index, task })
    },
    async restoreTaskAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      const { data: task } = await restoreTask(id)
      commit(RESTORE_TASK, { index, task })
    },
    async deleteTaskByIdAction({ commit }: Store<State>, { id, index }: { id: string; index: number }) {
      await deleteTaskById(id)
      commit(DELETE_TASK_BY_ID, index)
    }

  }
}