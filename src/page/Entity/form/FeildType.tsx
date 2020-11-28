import * as React from "react";
import { Select } from "antd";
import {
  ENUM_FIELDTYPE_ARRAY,
  ENUM_FIELDTYPE_BOOL,
  ENUM_FIELDTYPE_DATE,
  ENUM_FIELDTYPE_DATETIME,
  ENUM_FIELDTYPE_DETAIL,
  ENUM_FIELDTYPE_ENUM,
  ENUM_FIELDTYPE_EXTENDS,
  ENUM_FIELDTYPE_FLOAT32,
  ENUM_FIELDTYPE_FLOAT64,
  ENUM_FIELDTYPE_INT,
  ENUM_FIELDTYPE_INT16,
  ENUM_FIELDTYPE_INT32,
  ENUM_FIELDTYPE_INT64,
  ENUM_FIELDTYPE_INT8,
  ENUM_FIELDTYPE_OBJECT,
  ENUM_FIELDTYPE_STRING,
  ENUM_FIELDTYPE_UINT,
  ENUM_FIELDTYPE_UINT16,
  ENUM_FIELDTYPE_UINT32,
  ENUM_FIELDTYPE_UINT64,
  ENUM_FIELDTYPE_UINT8,
} from "@/domain/enums";

const { Option } = Select;

const options = [
  {
    label: "string",
    value: ENUM_FIELDTYPE_STRING,
  },
  {
    label: "int",
    value: ENUM_FIELDTYPE_INT,
  },
  {
    label: "int8",
    value: ENUM_FIELDTYPE_INT8,
  },
  {
    label: "int16",
    value: ENUM_FIELDTYPE_INT16,
  },
  {
    label: "int32",
    value: ENUM_FIELDTYPE_INT32,
  },
  {
    label: "int64",
    value: ENUM_FIELDTYPE_INT64,
  },
  {
    label: "uint",
    value: ENUM_FIELDTYPE_UINT,
  },
  {
    label: "uint8",
    value: ENUM_FIELDTYPE_UINT8,
  },
  {
    label: "uint16",
    value: ENUM_FIELDTYPE_UINT16,
  },
  {
    label: "uint32",
    value: ENUM_FIELDTYPE_UINT32,
  },
  {
    label: "uint64",
    value: ENUM_FIELDTYPE_UINT64,
  },
  {
    label: "float32",
    value: ENUM_FIELDTYPE_FLOAT32,
  },
  {
    label: "float64",
    value: ENUM_FIELDTYPE_FLOAT64,
  },
  {
    label: "bool",
    value: ENUM_FIELDTYPE_BOOL,
  },
  {
    label: "日期",
    value: ENUM_FIELDTYPE_DATE,
  },
  {
    label: "时间",
    value: ENUM_FIELDTYPE_DATETIME,
  },
  {
    label: "外键",
    value: ENUM_FIELDTYPE_OBJECT,
  },
  {
    label: "子表",
    value: ENUM_FIELDTYPE_DETAIL,
  },
  {
    label: "枚举",
    value: ENUM_FIELDTYPE_ENUM,
  },
  {
    label: "自定义",
    value: ENUM_FIELDTYPE_EXTENDS,
  },
];

interface IFieldType {
  value: any;
  onChange: (data: any) => void;
  disabled?: boolean;
}

export const isRefer = () => {

}

export default function FieldType(props: IFieldType) {
  return (
    <Select
      size="small"
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      style={{width: '100px'}}
    >
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}
