import { IConstantItem } from './ConstantItem'
export interface IConstant {
  //id
  id?: string;
  //常量name
  name?: string;
  //常量名称
  label?: string;
  //规则
  rule?: string;
  //明细列表
  items?: Array<IConstantItem>;
}