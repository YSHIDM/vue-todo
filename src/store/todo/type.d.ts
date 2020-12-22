export type NodeType = 'recycle' | 'archive' | 'todo' | 'inProgress' | 'testing' | 'done';
export interface Todo {
  id: string;
  title: string;
  content: string;
  node: NodeType;
  isArchive: boolean;
  isRecycle: boolean;
  creator: string;
  createdAt: string;
  modifier: string;
  updatedAt: string;
}

export interface AllTodoList {
  recycle: Todo[];
  archive: Todo[];
  todo: Todo[];
  inProgress: Todo[];
  testing: Todo[];
  done: Todo[];
}

export interface State {
  isInit: boolean;
  allTodoList: AllTodoList;
}
