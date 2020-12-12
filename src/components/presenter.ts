import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
  ENUM_MODE_VIEW,
} from "@domain/enums";
import {createEntity, getEntityByID, updateEntity} from "@services/entity";
import { parseQuery } from "@utils";
import { debug } from "leancloud-storage";
import _ from "lodash";
import { action, observable, runInAction } from "mobx";
import {message} from "antd";

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
      this.data = result;
      this.loading = ENUM_LOADING_SUCCESS;
    } catch (e) {
      this.loading = ENUM_LOADING_FAILED;
    }
  }

  saveData = () => {
    switch (this.mode) {
      case ENUM_MODE_CREATE:
        this.createData();
        break;
      case ENUM_MODE_EDIT:
        this.updateData();
        break;
    }
  };

  createData = async () => {
    try {
      this.loading = ENUM_LOADING_SENDING;
      await createEntity(this.entityName, this.data);
      this.loading = ENUM_LOADING_SUCCESS;
      message.success("保存成功");
    } catch (e) {
      console.log(e);
      this.loading = ENUM_LOADING_FAILED;
      message.error("保存失败");
    }
  };

  updateData = async () => {
    try {
      this.loading = ENUM_LOADING_SENDING;
      await updateEntity(this.entityName, this.data);
      this.loading = ENUM_LOADING_SUCCESS;
      message.success("保存成功");
    } catch (e) {
      console.log(e);
      this.loading = ENUM_LOADING_FAILED;
      message.error("保存失败");
    }
  };
}
