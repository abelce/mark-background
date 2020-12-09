import { ITempalte } from '../entity-interfaces/Tempalte'
import { TemplateItem } from '../entity-classes/TemplateItem'
import { ITemplateItem } from '../entity-interfaces/TemplateItem'

export class Tempalte implements ITempalte {

  id: string
  referEntityName: string
  referEntityID: string
  items: Array<ITemplateItem>
  isDeleted: boolean
  createdTime: number
  updateTime: string
  operatorID: string
  formProps: any

  constructor({id, referEntityName, referEntityID, items, isDeleted, createdTime, updateTime, operatorID, formProps}: ITempalte={}){
    this.id = id;
    this.referEntityName = referEntityName;
    this.referEntityID = referEntityID;
    this.items = (items || []).map(item => new TemplateItem(item));
    this.isDeleted = isDeleted;
    this.createdTime = createdTime;
    this.updateTime = updateTime;
    this.operatorID = operatorID;
    this.formProps = formProps;
  }
}