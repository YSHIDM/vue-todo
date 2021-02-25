import { query, mutation } from '@/api/config';
import { getAllTodoNodeGql } from './query';
import { saveTodoNodeGql, saveAllTodoNodeGql } from './mutation';

export const getAllTodoNode = (): Promise<HttpRes<Array<TodoNodeModel.TodoNodeData>>> => query({
  query: getAllTodoNodeGql,
}, 'getAllTodoNode')

export const saveTodoNode = (obj: { id: string; alias: string }) => mutation({
  mutation: saveTodoNodeGql,
  variables: {
    obj,
  }
}, 'saveTodoNode')

export const saveAllTodoNode = (objArray: Array<{ alias: string; title: string; name: string }>) => mutation({
  mutation: saveAllTodoNodeGql,
  variables: {
    objArray,
  }
}, 'saveAllTodoNode')