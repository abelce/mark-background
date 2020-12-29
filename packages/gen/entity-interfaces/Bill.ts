export interface IBill {
  //id
  id?: string;
  //账单时间
  time?: number;
  //账单分类
  category?: string;
  //账单金额
  amount?: number;
  //账单类型
  type?: number;
  //是否删除
  isDeleted?: boolean;
  //更新时间
  lastUpdateTime?: number;
}