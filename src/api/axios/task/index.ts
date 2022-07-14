import { service } from '@/api/config'
import { Task } from './type.d'

export const saveTask: (task: Task) => Promise<{ code: number, data: any }> = (task: Task) => service.post('/task/saveTask', task)
export const getTaskById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/getTaskById', { id })
export const deleteTaskById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/deleteTaskById', { id })
export const taskNext: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/taskNext', { id })
export const taskDone: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/taskDone', { id })
export const closeTask: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/closeTask', { id })
export const restoreTask: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/restoreTask', { id })
export const taskArchive: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/task/taskArchive', { id })
export const getTaskByNode: (node: string) => Promise<{ code: number, data: any }> = (node: string) => service.post('/task/getTaskByNode', { node })
export const getArchiveTask: () => Promise<{ code: number, data: any }> = () => service.post('/task/getArchiveTask')
export const getCloseTask: () => Promise<{ code: number, data: any }> = () => service.post('/task/getCloseTask')
