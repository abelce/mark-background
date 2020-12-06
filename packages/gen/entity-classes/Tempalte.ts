import { ITempalte } from '../entity-interfaces/Tempalte'
import { Iorder } from '../entity-interfaces/order'

export class Tempalte implements ITempalte {

  id: string
  label: string
  isDefault: ITempalte
  entityID: Array<Iorder>
  startDate: number
  endDate: number
  orderCount: number

  constructor({id, label, isDefault, entityID, startDate, endDate, orderCount}={}){
    this.id = id;
    this.label = label;
    this.isDefault = isDefault;
    this.entityID = entityID || [];
    this.startDate = startDate;
    this.endDate = endDate;
    this.orderCount = orderCount;
  }
}