import { ENUM_FIELDTYPE_BOOL, ENUM_FIELDTYPE_DATE, ENUM_FIELDTYPE_NUMBER, ENUM_FIELDTYPE_STRING } from '@/domain/enums';
import { IField } from '@/domain/interface';
import { DatePicker, Input, InputNumber, Radio } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import * as React from 'react';


// export const ENUM_FIELDTYPE = 'ENUM_FIELDTYPE';
// export const ENUM_FIELDTYPE_STRING = 'string';
// export const ENUM_FIELDTYPE_UNDEFINED = 'undefined';
// export const ENUM_FIELDTYPE_NULL = 'null';
// export const ENUM_FIELDTYPE_NUMBER = 'number';
// export const ENUM_FIELDTYPE_DATE = 'date';
// export const ENUM_FIELDTYPE_OBJECT = 'object';
// export const ENUM_FIELDTYPE_BOOL = 'bool';


export function FieldSelector(field: IField) {
    const {fieldType, label, name} = field
    switch(fieldType) {
        case ENUM_FIELDTYPE_STRING:
            return Input;
        case ENUM_FIELDTYPE_NUMBER:
            return InputNumber;
        case ENUM_FIELDTYPE_DATE:
            return DatePicker;
        case ENUM_FIELDTYPE_BOOL:
            return Checkbox
        default:
            return null;
    }
}


