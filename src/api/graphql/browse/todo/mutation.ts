// saveTodo
// deleteTodoById
// todoNext
// todoDone
// closeTodo
// restoreTodo
// todoArchive

import gql from 'graphql-tag'
import todoField from './field'

export const saveTodoGql = gql`
  mutation($obj: TodoInput!) {
    saveTodo(obj: $obj) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
export const deleteTodoByIdGql = gql`
  mutation($id: String!) {
    deleteTodoById(id: $id) {
      code
      msg
    }
  }
`
export const todoNextGql = gql`
  mutation($id: String!) {
    todoNext(id: $id) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
export const todoDoneGql = gql`
  mutation($id: String!) {
    todoDone(id: $id) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
// 删除
export const closeTodoGql = gql`
  mutation($id: String!) {
    closeTodo(id: $id) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
// 回收站
export const restoreTodoGql = gql`
  mutation($id: String!) {
    restoreTodo(id: $id) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
export const todoArchiveGql = gql`
  mutation($id: String!) {
    todoArchive(id: $id) {
      code
      msg
      data {
        ${todoField}
      }
    }
  }
`
