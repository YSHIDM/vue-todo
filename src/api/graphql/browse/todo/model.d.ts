declare namespace TodoModel {
  interface TodoData {
    id: string;
    title: string;
    content: string;
    node: NodeType;
    isArchive: boolean;
    isClose: boolean;
    creator: string;
    createdAt: string;
    modifier: string;
    updatedAt: string;
  }
  type NodeType = 'recycle' | 'archive' | 'todo' | 'inProgress' | 'testing' | 'done';
}
