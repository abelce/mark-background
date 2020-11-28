import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
} from "@domain/enums";
import { getEntityList } from "@services";
import { observable, runInAction } from "mobx";

interface IPagination {
  // 数据总数目
  total: number;
  // 当前页号
  current: number;
  // 分页大小
  size: number;
}

// 查询条件
interface ISearch {}

export class ListPresenter<T> {
  // 业务对象, 不可更改
  private readonly entityName: string = "";

  // 分页信息
  @observable
  public pagination: IPagination = {
    size: 20,
    current: 0,
    total: 0,
  };

  // 查询条件
  @observable
  public search: ISearch = {};

  // 数据列表
  @observable
  public listData: Array<T> = [];

  // 加载状态
  @observable
  public loading: string = ENUM_LOADING_SUCCESS;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  public init() {}

  // 获取数据列表
  public async queryList(current: number = 0) {
    this.loading = ENUM_LOADING_SENDING;
    try {
      const result = await getEntityList(this.entityName, {
        "page[limit]": this.pagination.size, // 分页大小
        "page[offset]": this.pagination.size * Math.max(current - 1, 0), // 偏移量
      });
      runInAction(() => {
        this.listData = this.dataReslover(result.data);
        this.pagination.total = result.total;
        this.pagination.current = current;
        this.loading = ENUM_LOADING_SUCCESS;
      })
    } catch (e) {
      console.error(e);
      this.loading = ENUM_LOADING_FAILED;
    }
  }

  // 对获取到的数据做处理
  public dataReslover(data: Array<T>): Array<T> {
    return data;
  }
}
