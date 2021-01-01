export interface IMark {
  //收藏id
  id?: string;
  //标题
  title?: string;
  //地址url
  url?: string;
  //是否删除
  isDeleted?: string;
  //是否已读
  isRead?: string;
  //创建时间
  createTime?: number;
  //更新时间
  lastUpdatedTime?: number;
  //是否星标
  isStar?: boolean;
  //分类
  type?: string;
}