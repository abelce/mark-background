/*
 * File: FeildType copy.tsx
 * Project: ant-design-pro
 * File Created: Tuesday, 24th November 2020 8:54:40 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Tuesday, 24th November 2020 8:54:40 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
import * as React from 'react';
import { Select } from 'antd';
import { ENUM_VALUETYPE_MULTI, ENUM_VALUETYPE_RANGE, ENUM_VALUETYPE_SINGLE } from '@/domain/enums';

const { Option } = Select;

const options = [
    {
        label: '单值',
        value: ENUM_VALUETYPE_SINGLE,
    },
    {
        label: '多值',
        value: ENUM_VALUETYPE_MULTI,
    },
    {
        label: '区间',
        value: ENUM_VALUETYPE_RANGE,
    },
];

interface IValueType {
    value: any;
    onChange: (data: any) => void;
    disabled?: boolean;
}

export  default function ValueType(props: IValueType) {
    return <Select size="small" value={props.value} onChange={props.onChange} disabled={props.disabled}>
        {
            options.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)
        }
    </Select>
}