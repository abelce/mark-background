import { IConstant } from '../entity-interfaces/Constant'
import { ConstantItem } from '../entity-classes/ConstantItem'
import { IConstantItem } from '../entity-interfaces/ConstantItem'

export class Constant implements IConstant {

  id: string
  name: string
  label: string
  rule: string
  items: Array<IConstantItem>

  constructor({id, name, label, rule, items}: IConstant={}){
    this.id = id;
    this.name = name;
    this.label = label;
    this.rule = rule;
    this.items = (items || []).map(item => new ConstantItem(item));
  }
}