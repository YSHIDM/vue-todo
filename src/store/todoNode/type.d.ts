export interface TodoNode {
  id: string;
  name: string;
  title: string;
  alias: string;

  creator: string;
  createdAt: string;
  modifier: string;
  updatedAt: string;
}

export interface State {
  allTodoNodeList: Array<TodoNode>;
}