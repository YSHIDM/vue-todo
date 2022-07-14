export type NodeType = 'recycle' | 'archive' | 'planning' | 'ongoing' | 'testing' | 'done';
// export interface TaskData extends TaskModel.TaskData{}
export interface Task {
  id: string;
  title: string;
  content: string;
  planTime: string;
  node: NodeType;
  history: Array<TaskModel.History>;
  isArchive: boolean;
  isClose: boolean;
  creator: string;
  createdAt: string;
  modifier: string;
  updatedAt: string;
}


// export interface State {
//   planning: Task[];
//   ongoing: Task[];
//   testing: Task[];
//   done: Task[];
//   archive: Task[];
//   recycle: Task[];
// }
