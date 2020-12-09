import { IUser } from '../entity-interfaces/User'
import { Iundefined } from '../entity-interfaces/undefined'

export class User implements IUser {

  客户: Array<number>

  constructor({客户}: IUser={}){
    this.客户 = 客户 || [];
  }
}