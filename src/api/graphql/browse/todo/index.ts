import { query, mutation } from '@/api/config';
import { getAllTodoGql, getTodoByIdGql } from './query';
import {
  saveTodoGql,
  deleteTodoByIdGql,
  todoNextGql,
  todoDoneGql,
  closeTodoGql,
  restoreTodoGql,
  todoArchiveGql,
} from './mutation';

export const getAllTodo = (): Promise<HttpRes<Array<TodoModel.TodoData>>> => query({
  query: getAllTodoGql,
}, 'getAllTodo')

export const getTodoById = (id: string) => query({
  query: getTodoByIdGql,
  variables: {
    id,
  }
}, 'getTodoById')

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

export const closeTodo = (id: string) => mutation({
  mutation: closeTodoGql,
  variables: {
    id
  }
}, 'closeTodo')

export const restoreTodo = (id: string) => mutation({
  mutation: restoreTodoGql,
  variables: {
    id
  }
}, 'restoreTodo')

export const todoArchive = (id: string) => mutation({
  mutation: todoArchiveGql,
  variables: {
    id
  }
}, 'todoArchive')
