import { IExtend, ITemplate, ITemplateItem } from "@domain/interface/template";
import {getExtendProps} from "@domain/template/extendPropsFuncMap";

export class Template implements ITemplate {
  id: string = "";
  label: string = "";
  referEntityID: string = "";
  referEntityName: string = "";
  items: Array<ITemplateItem>;
  createdTime: number = +new Date();
  udpateTime: number = +new Date();

  constructor(data: ITemplate) {
    const {
      id,
      label,
      referEntityID,
      referEntityName,
      items,
      createdTime,
      udpateTime,
    } = data;
    this.id = id;
    this.label = label;
    this.referEntityID = referEntityID;
    this.referEntityName = referEntityName;
    this.items = (items || []).map((item) => new TemplateItem(item)) || [];
    this.createdTime = createdTime;
    this.udpateTime = udpateTime;
  }
}

export class TemplateItem implements ITemplateItem {
  label: string = "";
  name: string = "";
  compType: string = "";
  readonly: boolean = false;
  required: boolean = false;
  width: number;
  extendProps?: Array<IExtend>;

  constructor(data: ITemplateItem) {
    const {
      label,
      name,
      compType,
      readonly,
      required,
      width,
      extendProps,
    } = data;
    this.label = label;
    this.name = name;
    this.compType = compType;
    this.readonly = readonly;
    this.required = required;
    this.width = width;
    this.extendProps = extendProps || getExtendProps(this.compType);
  }

  // 重置extendProps
  resetExtendProps() {
    this.extendProps = getExtendProps(this.compType);
  }
}