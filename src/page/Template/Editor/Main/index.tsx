import { ENUM_PROPTYPE_STYLE } from '@/domain/enums';
import { IField } from '@/domain/interface';
import * as React from 'react';
import { ICompProp, IProp } from '../PropsContainer';
import * as Style from './style.scss';

interface IViewItem {
    comp: React.Component | React.FC;
    options: IField;
    props: Array<ICompProp>;
}

interface IMain {
    viewItems: Array<IViewItem>
}

// 获取组件的style
function getStyle(item: IViewItem) {
    const {props = []} = item;
    const style = {};
    props.forEach((prop: IProp) => {
        if (prop.type === ENUM_PROPTYPE_STYLE) {
            style[prop.key] = props.values;
        }
    });
    return style;
}

// 获取每一个组件的props
function getItemProps(item: IViewItem) {
    const {options} = item;
    return {
        ...options,
        style: getStyle(item),
    }
}

// 主视曲
export default function Main(props: IMain) {

    const {viewItems = []} = props;
    return <div>
        {
            viewItems.map(item => <item.comp {...getItemProps(item)}/>)
        }
    </div>
}