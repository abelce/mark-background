import { IEnum } from '../entity-interfaces/Enum'

export class Enum implements IEnum {

  id: string
  name: string
  label: string
  items: string
  rule: string

  constructor({id, name, label, items, rule}: IEnum={}){
    this.id = id;
    this.name = name;
    this.label = label;
    this.items = items;
    this.rule = rule;
  }
}