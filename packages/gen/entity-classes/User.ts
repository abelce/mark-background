import { IUser } from '../entity-interfaces/User'

export class User implements IUser {

  id: string
  name: string
  sex: string
  age: boolean
  createdTime: date

  constructor({id, name, sex, age, createdTime}={}){
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.createdTime = createdTime;
  }
}