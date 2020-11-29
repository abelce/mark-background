import { IField } from "@/domain/interface";
import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, Slider, Switch, TimePicker } from "antd";
import * as React from "react";
import { ICompProp, IProp } from "../PropsContainer";
import cn from "classnames";
import * as Style from "./style.scss";
const _ = {
    get: require("lodash/get"),
};

const DateRangePicker = DatePicker.RangePicker;
const TimeRangePicker = TimePicker.RangePicker;
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
            if (prop.key === 'width') {
                style[prop.key] = `${prop.value}%`;
            } else {
                style[prop.key] = prop.value;
            }
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
            switch (prop.key) {
                default:
                    attrs[prop.key] = prop.value;
                    break;
            }
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

// 获取元素的栅格大小
function getColSpan(item: IViewItem) {
    const { extendProps = [] } = item;
    let col = 0;
    extendProps.forEach((prop: IProp) => {
        if (prop.type === 'col' && prop.key === 'col') {
            col = prop.value;
        }
    });
    return col;
}

// 获取width
function getWidth(item: IViewItem) {
    const { extendProps = [] } = item;
    for(let prop of extendProps) {
        if (prop.type === 'style') {
            if (prop.key === 'width') {
               return `${prop.value}%`;
            }
        }
    }
    return '';
}

function getCompAttr(item: IViewItem) {
    const { extendProps = [] } = item;
    const attrs = {};
    extendProps.forEach((prop: IProp) => {
        if (prop.type === 'comp-attr') {
            switch (prop.key) {
                case 'readonly':
                    attrs['disabled'] = prop.value;
                    break;
                default:
                    attrs[prop.key] = prop.value;
                    break;
            }
        }
    });
    return attrs;
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
                <Row style={{ width: '100%' }}>
                    {items.map((item) =>
                        renderComp(item, item.name === _.get(props.current, "name"), onSelect)
                    )}
                </Row>
            </Form>
        </div>
    );
}
// 获取组件的text文本
function getCompText(item: IViewItem) {
    const { extendProps = [] } = item;
    for(let prop of extendProps) {
        if (prop.type === 'text') {
            if (prop.key === 'text') {
               return prop.value;
            }
        }
    }
    return null;
}

function renderComp(item: IViewItem, isActive: boolean, onSelect: (item: IViewItem) => void) {
    const Comp = switchComp(item);
    const itemProps = getItemProps(item);
    return (
        <Col span={getColSpan(item)}>
            <Form.Item
                onClick={() => onSelect(item)}
                label={item.label}
                {...itemProps}
                className={cn(Style.field, { [Style.active]: isActive })}
            >
                <Comp {...getCompAttr(item)} >
                    {getCompText(item)}
                </Comp>
            </Form.Item>
        </Col>
    );
}

function switchComp(item: IViewItem) {
    switch (item.compType) {
        case "input":
            return Input;
        case "textarea":
            return Input.TextArea;
        case "inputNumber":
            return InputNumber;
        case "checkbox":
            return Checkbox;
        case "radio":
            return Radio;
        case "switch":
            return Switch;
        case "slider":
            return Slider;
        case "date":
            return DatePicker;
        case "dateRange":
            return DateRangePicker;
        case 'datetime':
            return TimePicker;
        case 'datetimeRange':
            return TimeRangePicker;
        case 'rate':
            return Rate;
        case 'button':
            return Button;
        default:
            return Input;
    }
}
