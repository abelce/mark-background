import { ISearchItem } from '../entity-interfaces/SearchItem'

export class SearchItem implements ISearchItem {

  name: string
  value: string
  operator: string

  constructor({name, value, operator}: ISearchItem={}){
    this.name = name;
    this.value = value;
    this.operator = operator;
  }
}