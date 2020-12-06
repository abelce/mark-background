import { IEnumItem } from './EnumItem'
export interface IEnum {
  //id
  id?: string;
  //名称
  name?: string;
  //undefined
  label?: string;
  //明细
  items?: Array<IEnumItem>;
  //规则
  rule?: string;
}