import { IBill } from '../entity-interfaces/Bill'

export class Bill implements IBill {

  id: string
  time: number
  category: string
  amount: number
  type: number
  isDeleted: boolean
  lastUpdateTime: number

  constructor({id, time, category, amount, type, isDeleted, lastUpdateTime}: IBill={}){
    this.id = id;
    this.time = time;
    this.category = category;
    this.amount = amount;
    this.type = type;
    this.isDeleted = isDeleted;
    this.lastUpdateTime = lastUpdateTime;
  }
}