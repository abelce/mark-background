import { IUser } from '../entity-interfaces/User'

export class User implements IUser {

  id: string
  name: string
  mobile: string
  email: string
  avatar: string
  birthday: number

  constructor({id, name, mobile, email, avatar, birthday}: IUser={}){
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.avatar = avatar;
    this.birthday = birthday;
  }
}