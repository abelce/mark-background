import { Iorder } from './order'
export interface ITempalte {
  //id
  id?: string;
  //模版名称
  label?: string;
  //默认模版
  isDefault?: ITempalte;
  //业务对象id
  entityID?: Array<Iorder>;
  //开始日期
  startDate?: number;
  //结束日期
  endDate?: number;
  //订单数
  orderCount?: number;
}