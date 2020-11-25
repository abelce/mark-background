import * as React from 'react';
import { Select, Radio } from 'antd';
import { ENUM_FIELDTYPE_BOOL, ENUM_FIELDTYPE_DATE, ENUM_FIELDTYPE_NUMBER, ENUM_FIELDTYPE_OBJECT, ENUM_FIELDTYPE_STRING } from '@/domain/enums';

const { Option } = Select;

const options = [
    {
        label: '字符串',
        value: ENUM_FIELDTYPE_STRING,
    },
    {
        label: '数字',
        value: ENUM_FIELDTYPE_NUMBER,
    },
    {
        label: '数字',
        value: ENUM_FIELDTYPE_BOOL,
    },
    {
        label: '日期',
        value: ENUM_FIELDTYPE_DATE,
    },
    {
        label: '对象',
        value: ENUM_FIELDTYPE_OBJECT,
    },
];

interface IFieldType {
    value: any;
    onChange: (data: any) => void;
    disabled?: boolean;
}

export  default function FieldType(props: IFieldType) {
    return <Select size="small" value={props.value} onChange={props.onChange} disabled={props.disabled}>
        {
            options.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)
        }
    </Select>
}