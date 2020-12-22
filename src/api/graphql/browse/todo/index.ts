import { query, mutation } from '@/api/config';
import { getAllTodoGql } from './query';
import {
  saveTodoGql,
  deleteTodoByIdGql,
  todoNextGql,
  todoDoneGql,
  invalidateTodoGql,
  todoRecycleGql,
  todoArchiveGql,
} from './mutation';

export const getAllTodo = (): Promise<HttpRes<Array<TodoModel.TodoData>>> => query({
  query: getAllTodoGql,
}, 'getAllTodo')

export const saveTodo = (obj: { id: string; title: string; content: string }) => mutation({
  mutation: saveTodoGql,
  variables: {
    obj,
  }
}, 'saveTodo')

export const deleteTodoById = (id: string) => mutation({
  mutation: deleteTodoByIdGql,
  variables: {
    id
  }
}, 'deleteTodoById')

export const todoNext = (id: string) => mutation({
  mutation: todoNextGql,
  variables: {
    id
  }
}, 'todoNext')

export const todoDone = (id: string) => mutation({
  mutation: todoDoneGql,
  variables: {
    id
  }
}, 'todoDone')

export const invalidateTodo = (id: string) => mutation({
  mutation: invalidateTodoGql,
  variables: {
    id
  }
}, 'invalidateTodo')

export const todoRecycle = (id: string) => mutation({
  mutation: todoRecycleGql,
  variables: {
    id
  }
}, 'todoRecycle')

export const todoArchive = (id: string) => mutation({
  mutation: todoArchiveGql,
  variables: {
    id
  }
}, 'todoArchive')
