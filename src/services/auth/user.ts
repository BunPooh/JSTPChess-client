export interface IUser {
  uid: string;
  displayName: string;
}

export class User implements IUser {
  public uid: string;
  public displayName: string;
  public email: string;
  public photoURL?: string;
}
