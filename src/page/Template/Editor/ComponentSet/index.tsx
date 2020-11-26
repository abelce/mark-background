import { Input } from "antd";
import * as React from "react";
import { useCallback } from "react";
import * as Style from './style.scss';

interface IItem {
    label:string;
    name: string;
    comp?: React.Component | React.FC;
}

const components: Array<IItem> = [
    {
      label: "单行文本框",
      name: "input",
      comp: Input,
    },
    {
      label: "多行文本框",
      name: "textarea",
      comp: Input.TextArea,
    },
    {
      label: "数字输入框",
      name: "inputNumber",
    },
    {
      label: "单选框",
      name: "radio",
    },
    {
      label: "开关",
      name: "switch",
    },
    {
      label: "复选框",
      name: "checkbox",
    },
    {
      label: "滑动输入条",
      name: "slider",
    },
    {
      label: "日期",
      name: "date",
    },
    {
      label: "日期区间",
      name: "dateRange",
    },
    {
      label: "时间",
      name: "datetime",
    },
    {
      label: "时间区间",
      name: "datetimeRange",
    },
  ];


interface IOption {
    item: IItem;
    onClick: (item: IItem) => void;
}
function Option(props: IOption) {
    const handleClick = useCallback(() => {
        props.onClick(props.item);
    }, []);
    return <div className={Style.item} onClick={handleClick}>
        <div className={Style.content}>
        {props.item.label}
        </div>
    </div>
}

interface ComponentSet {
    onClick: (comp: React.Component | React.FC;) => void;
}
export default function ComponentSet(props: ComponentSet) {
    const handleChange = useCallback((data: IItem) => {
        props.onClick(data.comp);
    }, []);
  return <div className={Style.container}>
      {
        components.map(option => <Option key={option.name} item={option} onClick={handleChange}/>)
      }
  </div>;
}
