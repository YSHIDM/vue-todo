declare namespace TodoModel {
  interface TodoData {
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
}
