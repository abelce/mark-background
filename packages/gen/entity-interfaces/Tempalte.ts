import { ITemplateItem } from './TemplateItem'
export interface ITempalte {
  //id
  id?: string;
  //实体name
  referEntityName?: string;
  //实体id
  referEntityID?: string;
  //字段明细
  items?: Array<ITemplateItem>;
  //是否删除
  isDeleted?: boolean;
  //创建时间
  createdTime?: number;
  //更新时间
  updateTime?: string;
  //操作者id
  operatorID?: string;
  //表单属性
  formProps?: any;
}