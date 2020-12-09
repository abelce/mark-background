import { Presenter } from "@components/presenter";
import { ENUM_FIELDTYPE_BOOL, ENUM_FIELDTYPE_FLOAT32, ENUM_FIELDTYPE_FLOAT64, ENUM_FIELDTYPE_INT, ENUM_FIELDTYPE_INT16, ENUM_FIELDTYPE_INT64, ENUM_FIELDTYPE_INT8, ENUM_FIELDTYPE_STRING, ENUM_FIELDTYPE_UINT, ENUM_FIELDTYPE_UINT16, ENUM_FIELDTYPE_UINT32, ENUM_FIELDTYPE_UINT64, ENUM_FIELDTYPE_UINT8 } from "@domain/enums";
import { IField } from "@domain/interface";
import { TemplateItem } from "@domain/template";
import { action } from "mobx";
import { oc } from "ts-optchain";

export class EditPresenter extends Presenter {
  // 当前选中的组件的名称
  public currentItemName: string

  // 当前组件对应的右侧属性列表的信息
  public compProps;

  // 表单的属性信息
  public formProps;

  // 当前选中的字段
  public get currentItem() {
    return oc(this.data).items([]).find(item => item.name === this.currentItemName);
  }
  
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
    let {items} = this.data;
    if (!Array.isArray(items)) {
      items = [];
    }
    items.push(newComp);
    this.data={
      ...this.data,
      items,
    };
  }

  @action
  public removeItem(name: string) {
    this.data.items = this.data.items.filter(item => item.name !== name);
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
      return 'checkbox';
    default:
      return 'input';
  }
}