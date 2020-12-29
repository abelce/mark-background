export interface IBillCategory {
  //分类ID
  id?: string;
  //分类名称
  name?: string;
  //分类类型
  type?: number;
  //是否删除
  isDeleted?: boolean;
  //创建时间
  createdTime?: number;
  //更新时间
  lastUpdateTime?: number;
}