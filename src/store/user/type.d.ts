export interface User {
  id: string;
  nickname: string;
}


export interface State {
  user: User;
  publicKey: string;
}
