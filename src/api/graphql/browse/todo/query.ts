import gql from 'graphql-tag';
import todoField from './field';

export const getAllTodoGql = gql`
query {
  getAllTodo {
    code
    msg
    data {
      ${todoField}
    }
  }
}
`

export const getTodoByIdGql = gql`
query($id: String!) {
  getTodoById(id: $id) {
    code
    msg
    data {
      ${todoField}
    }
  }
}
`