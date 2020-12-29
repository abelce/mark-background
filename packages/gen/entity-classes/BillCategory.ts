import { IBillCategory } from '../entity-interfaces/BillCategory'

export class BillCategory implements IBillCategory {

  id: string
  name: string
  type: number
  isDeleted: boolean
  createdTime: number
  lastUpdateTime: number

  constructor({id, name, type, isDeleted, createdTime, lastUpdateTime}: IBillCategory={}){
    this.id = id;
    this.name = name;
    this.type = type;
    this.isDeleted = isDeleted;
    this.createdTime = createdTime;
    this.lastUpdateTime = lastUpdateTime;
  }
}