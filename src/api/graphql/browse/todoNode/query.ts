import gql from 'graphql-tag';
import todoNodeField from './field';

export const getAllTodoNodeGql = gql`
query {
  getAllTodoNode {
    code
    msg
    data {
      ${todoNodeField}
    }
  }
}
`
