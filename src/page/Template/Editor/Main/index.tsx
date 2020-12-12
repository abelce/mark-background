import {IField} from "@/domain/interface";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Slider,
    Switch,
    TimePicker
} from "antd";
import * as React from "react";
import {ICompProp, IProp} from "../PropsContainer";
import cn from "classnames";
import * as Style from "./style.scss";
import {observer, Observer} from "mobx-react";
import {EditPresenter} from "@page/Template/Editor/editPreenter";
import {oc} from "ts-optchain";
import {getFooterString} from "@page/Template/Editor/Main/footer";
console.log(Style);
const _ = {
    get: require("lodash/get"),
};

interface IViewItem {
    comp: React.Component | React.FC;
    options: IField;
    props: Array<ICompProp>;
}

interface IMain {
    presenter: EditPresenter;
    isPreview?: boolean; // 是否为预览模式
}

// 获取组件的style
export function getStyle(item: IViewItem) {
    const {extendProps = []} = item;
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
export function getAttrs(item: IViewItem) {
    const {extendProps = []} = item;
    const attrs = {};
    extendProps.forEach((prop: IProp) => {
        if (prop.type === 'attr') {
            switch (prop.key) {
                case 'readonly':
                    attrs["disabled"] = prop.value;
                default:
                    attrs[prop.key] = prop.value;
                    break;
            }
        }
    });
    return attrs;
}

// 获取每一个组件的props
export function getItemProps(item: IViewItem) {
    const {extendProps} = item;
    return {
        style: getStyle(item),
        ...getAttrs(item),
    };
}

// 获取元素的栅格大小
export function getColSpan(item: IViewItem) {
    const {extendProps = []} = item;
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
    const {extendProps = []} = item;
    for (let prop of extendProps) {
        if (prop.type === 'style') {
            if (prop.key === 'width') {
                return `${prop.value}%`;
            }
        }
    }
    return '';
}

export function getCompAttr(item: IViewItem) {
    const {extendProps = []} = item;
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


export const formLayout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
};
// 主视曲
export default function Main(props: IMain) {
    return (
        <div>
            <Observer>
                {
                    () => (
                        <Form {...formLayout} layout="vertical" className={Style.form}>
                            <Row style={{width: '100%'}}>
                                {oc(props.presenter).data.items([]).map((item) =>
                                    renderComp({
                                        item,
                                        isActive: props.isPreview ? false : item.name === oc(props.presenter).currentItemName(''),
                                        onSelect: props.isPreview ? () => {
                                        } : props.presenter.activeComponent,
                                        isPreview: props.isPreview,
                                    })
                                )}
                            </Row>
                            {props.isPreview && getFooterString()}
                        </Form>
                    )
                }
            </Observer>
        </div>
    );
}

// 获取组件的text文本
export function getCompText(item: IViewItem) {
    const {extendProps = []} = item;
    for (let prop of extendProps) {
        if (prop.type === 'text') {
            if (prop.key === 'text') {
                return prop.value;
            }
        }
    }
    return null;
}

interface IRenderComp {
    item: IViewItem,
    isActive: boolean,
    onSelect: (name: string) => void,
    isPreview: boolean,

}

export function renderComp(props: IRenderComp) {
    const {item, isActive, onSelect, isPreview} = props;
    const Comp = switchComp(item);
    const itemProps = getItemProps(item);
    return <Col span={getColSpan(item)} key={item.name}>
        <Form.Item
            name={item.name}
            onClick={() => onSelect && onSelect(item.name)}
            label={item.label}
            {...itemProps}
            className={cn(Style.field, {[Style.field_hover]: !isPreview,[Style.active]: isActive})}
            rules={getRules(item)}
        >
            <Comp
                {...getCompAttr(item)}
            >
                {getCompText(item)}
            </Comp>
        </Form.Item>
    </Col>
}

// 获取字段的校验规则
export function getRules(item) {
    const {extendProps = []} = item;
    // 字段的公共规则
    const baseRules = [
        'required',
        'min',
        'max',
    ];

    const result = [];
    baseRules.forEach(ruleField => {
        const attr = extendProps.find(p => p.key === ruleField);
        if (attr) {
            result.push({
                type: item.fieldtype,
                [ruleField]: attr.value,
            })
        }
    })
    return result;
}

export function switchComp(item: IViewItem) {
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
            return DatePicker.RangePicker;
        case 'datetime':
            return TimePicker;
        case 'datetimeRange':
            return TimePicker.RangePicker;
        case 'rate':
            return Rate;
        case 'button':
            return Button;
        default:
            return Input;
    }
}

export function switchCompString(item: IViewItem) {
    switch (item.compType) {
        case "input":
            return 'Input';
        case "textarea":
            return 'Input.TextArea';
        case "inputNumber":
            return 'InputNumber';
        case "checkbox":
            return 'Checkbox';
        case "radio":
            return 'Radio';
        case "switch":
            return 'Switch';
        case "slider":
            return 'Slider';
        case "date":
            return 'DatePicker';
        case "dateRange":
            return 'DatePicker.RangePicker';
        case 'datetime':
            return 'TimePicker';
        case 'datetimeRange':
            return 'TimePicker.RangePicker';
        case 'rate':
            return 'Rate';
        case 'button':
            return 'Button';
        default:
            return 'Input';
    }
}