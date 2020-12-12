import { Presenter } from "@components/presenter";
import {
  ENUM_FIELDTYPE_BOOL,
  ENUM_FIELDTYPE_FLOAT32,
  ENUM_FIELDTYPE_FLOAT64,
  ENUM_FIELDTYPE_INT,
  ENUM_FIELDTYPE_INT16,
  ENUM_FIELDTYPE_INT64,
  ENUM_FIELDTYPE_INT8,
  ENUM_FIELDTYPE_STRING,
  ENUM_FIELDTYPE_UINT,
  ENUM_FIELDTYPE_UINT16,
  ENUM_FIELDTYPE_UINT32,
  ENUM_FIELDTYPE_UINT64,
  ENUM_FIELDTYPE_UINT8,
} from "@domain/enums";
import { IField } from "@domain/interface";
import { TemplateItem } from "@domain/template";
import {action, computed, observable, runInAction} from "mobx";
import { oc } from "ts-optchain";
import {autobind} from "core-decorators";
import {IExtendProps} from "@domain/interface/template";

@autobind
export class EditPresenter extends Presenter {
  // 当前选中的组件的名称
  @observable
  public currentItemName: string = '';

  // 当前组件对应的右侧属性列表的信息
  @observable
  public compProps;

  // 当前选中的字段
  @computed
  public get currentItem() {
    return oc(this.data)
        .items([])
        .find((item) => item.name === this.currentItemName);
  }

  @computed
  public get currentItemIndex() {
    return oc(this.data)
        .items([])
        .findIndex((item) => item.name === this.currentItemName);
  }

  public get currentExtendProps() {
    return this.currentItem.extendProps;
  }

  // 表单的属性信息
  @observable
  public formProps;

  @action
  public addItem(field: IField) {
    const { label, name } = field;
    const compType = getDefaultCompByField(field);
    const newComp = new TemplateItem({
      label,
      name,
      compType,
      width: 200,
    });

    runInAction(() => {
      if (!Array.isArray(this.data.items)) {
        this.data.items = [];
      }
      this.data.items.push(newComp);
      this.currentItemName = name;
    })
  }

  @action
  public removeItem(name: string) {
    runInAction(() => {
      this.data.items = this.data.items.filter((item) => item.name !== name);
      this.currentItemName = '';
    })
  }

  public isItemExist(name: string) {
    return oc(this.data).items([]).some(item => item.name === name);
  }

  // 激活组件
  @action
  public activeComponent(name: string) {
    if (this.currentItemName !== name) {
      this.currentItemName = name;
    }
  }

  // 修改当前选中组件的extendProps
  @action
  public setExtendProps(extendProps: Array<IExtendProps>) {
    this.data.items[this.currentItemIndex].extendProps = extendProps;
    this.data = Object.assign({}, this.data);
  }
}

export function getDefaultCompByField(field: IField) {
  switch (field.fieldType) {
    case ENUM_FIELDTYPE_STRING:
      return "input";
    case ENUM_FIELDTYPE_INT:
    case ENUM_FIELDTYPE_INT8:
    case ENUM_FIELDTYPE_INT16:
    case ENUM_FIELDTYPE_INT:
    case ENUM_FIELDTYPE_INT64:
    case ENUM_FIELDTYPE_UINT:
    case ENUM_FIELDTYPE_UINT8:
    case ENUM_FIELDTYPE_UINT16:
    case ENUM_FIELDTYPE_UINT32:
    case ENUM_FIELDTYPE_UINT64:
    case ENUM_FIELDTYPE_FLOAT32:
    case ENUM_FIELDTYPE_FLOAT64:
      return "inputNumber";
    case ENUM_FIELDTYPE_BOOL:
      return "checkbox";
    default:
      return "input";
  }
}
