import { IEnumItem } from '../entity-interfaces/EnumItem'

export class EnumItem implements IEnumItem {

  key: string
  value: string
  description: string

  constructor({key, value, description}={}){
    this.key = key;
    this.value = value;
    this.description = description;
  }
}