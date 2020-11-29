import { IExtend, ITemplate, ITemplateItem } from "@domain/interface/template";

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
    this.items = items || [];
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
    this.extendProps = extendProps || getDefaultExtendProps();
  }
}

function getDefaultExtendProps() {
  const defaultProps: Array<IExtend> = [
    {
      type: "style",
      key: "width",
      value: 200,
    },
    {
        type: "attr",
        key: "required",
        value: false,
      },
      {
        type: "attr",
        key: "disabled",
        value: false,
      },
  ];

  return defaultProps;
}
