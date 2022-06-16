declare namespace TodoModel {
  interface History {
    node: string;
    title: string;
    time: string;
  }
  interface TodoData {
    id: string;
    title: string;
    content: string;
    node: NodeType;
    isArchive: boolean;
    isClose: boolean;
    history: Array<History>;
    creator: string;
    createdAt: string;
    modifier: string;
    updatedAt: string;
  }
  type NodeType = 'recycle' | 'archive' | 'planning' | 'ongoing' | 'testing' | 'done';
}
