import { service } from '@/api/config'

export const saveTodo: (todo: TodoModel.Todo) => Promise<{ code: number, data: any }> = (todo: TodoModel.Todo) => service.post('/todo/saveTodo', todo)
export const getPage: (query: TodoModel.QueryOptions) => Promise<{ code: number, data: any }> = (query: TodoModel.QueryOptions) => service.post('/todo/getPage', query)
export const getTodoById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/todo/getTodoById', { id })
export const deleteTodoById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/todo/deleteTodoById', { id })
export const todoArchive: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/todo/todoArchive', { id })
export const todoAbide: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/todo/todoAbide', { id })
