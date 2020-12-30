export type NodeType = 'recycle' | 'archive' | 'plan' | 'inProgress' | 'testing' | 'done';
export interface Todo {
  id: string;
  title: string;
  content: string;
  node: NodeType;
  isArchive: boolean;
  isClose: boolean;
  history: Array<TodoModel.History>;
  creator: string;
  createdAt: string;
  modifier: string;
  updatedAt: string;
}

export interface AllTodoList {
  recycle: Todo[];
  archive: Todo[];
  plan: Todo[];
  inProgress: Todo[];
  testing: Todo[];
  done: Todo[];
}

export interface State {
  isInit: boolean;
  allTodoList: AllTodoList;
}
