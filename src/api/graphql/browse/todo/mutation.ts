// saveTodo
// deleteTodoById
// todoNext
// todoDone
// invalidateTodo
// todoRecycle
// todoArchive

import gql from 'graphql-tag';
import todoField from './field';

export const saveTodoGql = gql`
  mutation($obj: TodoInput!) {
    saveTodo(obj: $obj) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
export const deleteTodoByIdGql = gql`
  mutation($id: String!) {
    deleteTodoById(id: $id) {
      rescode
      resmessage
    }
  }
`
export const todoNextGql = gql`
  mutation($id: String!) {
    todoNext(id: $id) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
export const todoDoneGql = gql`
  mutation($id: String!) {
    todoDone(id: $id) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
// 删除
export const invalidateTodoGql = gql`
  mutation($id: String!) {
    invalidateTodo(id: $id) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
// 回收站
export const todoRecycleGql = gql`
  mutation($id: String!) {
    todoRecycle(id: $id) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
export const todoArchiveGql = gql`
  mutation($id: String!) {
    todoArchive(id: $id) {
      rescode
      resmessage
      data {
        ${todoField}
      }
    }
  }
`
