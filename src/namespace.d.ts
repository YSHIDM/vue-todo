declare namespace ComponentDataType {
  // interface History {
  //   node: string;
  //   title: string;
  //   time: string;
  // }
  interface SelectedOptionChild {
    text: string;
    todo: TodoModel.TodoData;
  }
  interface SelectedOption {
    text: string;
    children: Array<SelectedOptionChild>;
  }
  // type NodeType = 'recycle' | 'archive' | 'plan' | 'inProgress' | 'testing' | 'done';
}