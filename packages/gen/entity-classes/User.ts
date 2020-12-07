import { IUser } from '../entity-interfaces/User'
import { ITemplateItem } from '../entity-interfaces/TemplateItem'

export class User implements IUser {

  id: string
  name: string
  sex: string
  age: boolean
  createdTime: number
  客户: ITemplateItem

  constructor({id, name, sex, age, createdTime, 客户}={}){
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.createdTime = createdTime;
    this.客户 = 客户;
  }
}