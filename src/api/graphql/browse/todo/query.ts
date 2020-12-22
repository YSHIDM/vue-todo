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