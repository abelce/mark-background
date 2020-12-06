import { IEnum } from '../entity-interfaces/Enum'
import { IEnumItem } from '../entity-interfaces/EnumItem'

export class Enum implements IEnum {

  id: string
  name: string
  label: string
  items: Array<IEnumItem>
  rule: string

  constructor({id, name, label, items, rule}={}){
    this.id = id;
    this.name = name;
    this.label = label;
    this.items = items || [];
    this.rule = rule;
  }
}