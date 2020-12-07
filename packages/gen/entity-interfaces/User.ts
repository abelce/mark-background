import { ITemplateItem } from './TemplateItem'
export interface IUser {
  //id
  id?: string;
  //名称
  name?: string;
  //性别
  sex?: string;
  //年龄
  age?: boolean;
  //创建时间
  createdTime?: number;
  //客户
  客户?: ITemplateItem;
}