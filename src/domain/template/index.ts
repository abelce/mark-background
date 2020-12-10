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
    this.extendProps = extendProps || getDefaultExtendProps(this.compType);
  }

  // 重置extendProps
  resetExtendProps() {
    this.extendProps = getDefaultExtendProps(this.compType);
  }
}

const extendPropsFuncMap = {
  button: getButtonExtendsProps,
};

// 切换组件时重新设置所有的属性
function getDefaultExtendProps(compType: string) {
  let defaultProps: Array<IExtend> = [
    {
      type: "style",
      key: "width",
      value: 100, // 默认100%
    },
    {
      type: "col",
      key: "col",
      value: 6, // 栅格值默认为6
    },
    {
      type: "attr",
      key: "required",
      value: false,
    },
    {
      type: "comp-attr",
      key: "readonly",
      value: false,
    },
  ];

  const spicalExtendProps = extendPropsFuncMap[compType]
    ? extendPropsFuncMap[compType]()
    : [];
  defaultProps = defaultProps.concat(spicalExtendProps);

  return defaultProps;
}

export function getButtonExtendsProps() {
  // button组件需要按钮text
  const extendProps: Array<IExtend> = [
    {
      type: "text",
      key: "text",
      value: "按钮",
    },
    {
      type: "comp-attr", // 组件自身的属性，作用在组件本身，eg: <Input type="primary"/>
      key: "type",
      value: "primary",
    },
  ];

  return extendProps;
}


export function getInputExtendsProps() {
  const extendProps: Array<IExtend> = [
    {
      type: "attr",
      key: "type",
      value: "password",
    },
  ];

  return extendProps;
}