import gql from 'graphql-tag';
import todoNodeField from './field';

export const saveTodoNodeGql = gql`
  mutation($obj: TodoNodeInput!) {
    saveTodoNode(obj: $obj) {
      code
      msg
      data {
        ${todoNodeField}
      }
    }
  }
`
