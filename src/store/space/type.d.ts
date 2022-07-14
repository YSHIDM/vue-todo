export type TodoType = 'ongoing' | 'archive' | 'abiding';
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

interface Page {
  currentPage: number;
  totalPages: number;
  rows: Todo[];
}
interface Todos {
  [index: string]: Todo
}
export interface State {
  ongoing: Page;
  archive: Page;
  abiding: Page;
  abidingTodoList: Todos;
}
