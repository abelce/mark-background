import * as React from 'react';
import { ENUM_PROPTYPE_STYLE } from '@/domain/enums';

export interface ICompProp {
    type: string;
    width: number;
    widthType: 'per' | 'px';
}

export interface IProp {
    type: string, // 属性的类型
    key: string;  // 属性的key
    value: string; // 属性的value
}

interface IPropsContainer {

}

export default function PropsContainer(props: IPropsContainer) {

}