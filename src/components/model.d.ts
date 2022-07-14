declare namespace TaskModel {
  interface History {
    node: string;
    title: string;
    time: string;
  }
  interface TaskData {
    id: string;
    title: string;
    content: string;
    planTime: string;
    node: NodeType;
    history: Array<History>;
    isArchive: boolean;
    isClose: boolean;
    creator: string;
    createdAt: string;
    modifier: string;
    updatedAt: string;
  }
  type TaskType = 'recycle' | 'archive' | 'planning' | 'ongoing' | 'testing' | 'done';
}
declare namespace TodoModel {
  interface Todo {
    id: string;
    title: string;
    planTime: string;
    timePeriod: number;
    isAbiding: boolean;
    isArchive: boolean;
    creator: string;
    createdAt: string;
    modifier: string;
    updatedAt: string;
  }
  interface QueryOptions {
    search?: string;
    filter?: Filter;
    pageSize?: number;
    currentPage?: number;
  }
  type TodoType = 'ongoing' | 'archive' | 'abiding'
}
declare namespace SpaceModel {
  interface Space {
    id: string;
    pid: string;
    name: string;
    tags: string;
    desc: string;
    creator: string;
    createdAt: string;
    modifier: string;
    updatedAt: string;
  }
  interface Query {
    search?: string;
    filter?: any;
    pageSize?: number;
    currentPage?: number;
  }
  interface State {
    spaceList: Space[];
    currentPage: number;
    totalPages: number;
  }
}