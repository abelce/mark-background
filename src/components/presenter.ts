import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
  ENUM_MODE_VIEW,
} from "@domain/enums";
import { getEntityByID } from "@services/entity";
import { parseQuery } from "@utils";
import { debug } from "leancloud-storage";
import _ from "lodash";
import { action, observable, runInAction } from "mobx";

export class Presenter {
  // 业务对象, 不可更改
  public readonly entityName: string = "";

  public id: string = "";

  // 数据
  @observable
  public data: any = null;

  public mode: string = "";

  // 加载状态
  @observable
  public loading: string = ENUM_LOADING_SUCCESS;

  constructor(entityName: string) {
    this.entityName = entityName;
    this.init();
  }

  @action
  public setData(data: any) {
    this.data = _.cloneDeep(data);
  }

  public init() {
    const obj = parseQuery();
    this.mode = (obj["mode"] as string) || ENUM_MODE_CREATE;
    this.id = obj.id;
    if (this.mode === ENUM_MODE_EDIT || this.mode === ENUM_MODE_VIEW) {
      this.queryData();
    }
  }

  // 获取数据列表
  @action
  public async queryData() {
    this.loading = ENUM_LOADING_SENDING;
    try {
      const result = ((await getEntityByID(
        this.entityName,
        this.id
      )) as unknown) as any;
      // runInAction(() => {
      this.data = result;
      this.loading = ENUM_LOADING_SUCCESS;
      // })
      
    } catch (e) {
      // console.error(e);
      this.loading = ENUM_LOADING_FAILED;
    }
  }

//   // 对获取到的数据做处理
//   public dataReslover(data: Array<T>): Array<T> {
//     return data;
//   }
}
