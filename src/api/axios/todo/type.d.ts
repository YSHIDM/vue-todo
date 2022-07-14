// export interface TaskData extends TaskModel.TaskData{}
export interface Todo {
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
export interface QueryOptions {
  search?: string;
  filter?: Filter;
  pageSize?: number;
  currentPage?: number;
}
interface Filter {
  isAbiding: boolean;
  isArchive: boolean;
}