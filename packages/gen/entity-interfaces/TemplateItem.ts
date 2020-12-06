export interface ITemplateItem {
  //id
  id?: string;
  //名称
  label?: string;
  //必填
  required?: boolean;
  //只读
  readonly?: boolean;
  //组件类型
  compType?: string;
  //自定义数据
  extendsProps?: any;
}