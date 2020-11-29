import { ENUM_PROPTYPE_STYLE } from "@/domain/enums";
import { IField } from "@/domain/interface";
import { Checkbox, Form, Input, InputNumber } from "antd";
import * as React from "react";
import { ICompProp, IProp } from "../PropsContainer";
import * as Style from "./style.scss";
import cn from "classnames";
const _ = {
  get: require("lodash/get"),
};

interface IViewItem {
  comp: React.Component | React.FC;
  options: IField;
  props: Array<ICompProp>;
}

interface IMain {
  items: Array<IViewItem>;
  current: IViewItem;
  onSelect: (item: IViewItem) => void,
}

// 获取组件的style
function getStyle(item: IViewItem) {
  const { extendProps = [] } = item;
  const style = {};
  extendProps.forEach((prop: IProp) => {
    if (prop.type === 'style') {
      style[prop.key] = prop.value;
    }
  });
  return style;
}

// 获取所有的属性
function getAttrs(item: IViewItem) {
    const { extendProps = [] } = item;
    const attrs = {};
    extendProps.forEach((prop: IProp) => {
      if (prop.type === 'attr') {
        attrs[prop.key] = prop.value;
      }
    });
    return attrs;
}

// 获取每一个组件的props
function getItemProps(item: IViewItem) {
  const { extendProps } = item;
  return {
    style: getStyle(item),
    ...getAttrs(item),
  };
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
// 主视曲
export default function Main(props: IMain) {
  const { items = [], onSelect } = props;
  return (
    <div>
      <Form {...layout} layout="vertical" className={Style.form}>
        {items.map((item) =>
          renderComp(item, item.name === _.get(props.current, "name"), onSelect)
        )}
      </Form>
    </div>
  );
}

function renderComp(item: IViewItem, isActive: boolean, onSelect: (item: IViewItem) => void) {
  const Comp = switchComp(item);

  debugger;
  const itemProps = getItemProps(item);
  return (
    <Form.Item
      onClick={() => onSelect(item)}
      label={item.label}
      {...itemProps}
      className={cn(Style.field, { [Style.active]: isActive })}
    >
      <Comp />
    </Form.Item>
  );
}

function switchComp(item: IViewItem) {
  switch (item.compType) {
    case "input":
      return Input;
    case "inputNumber":
      return InputNumber;
    case "checkbox":
      return Checkbox;
    default:
      return "input";
  }
}
