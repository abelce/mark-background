import { IConstantItem } from '../entity-interfaces/ConstantItem'

export class ConstantItem implements IConstantItem {

  key: string
  value: string
  desc: string

  constructor({key, value, desc}: IConstantItem={}){
    this.key = key;
    this.value = value;
    this.desc = desc;
  }
}