export type NodeType = 'recycle' | 'archive' | 'planning' | 'ongoing' | 'testing' | 'done';
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
  planning: Todo[];
  ongoing: Todo[];
  testing: Todo[];
  done: Todo[];
}

export interface State {
  isInit: boolean;
  allTodoList: AllTodoList;
}
