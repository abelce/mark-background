import * as React from "react";
import { Select } from "antd";
import {ENUM_object_FieldType} from '@gen/enum-objects';

const { Option } = Select;

const options = Reflect.ownKeys(ENUM_object_FieldType).map(key => ({
  label: ENUM_object_FieldType[key].description,
  value: ENUM_object_FieldType[key].value,
}))

interface IFieldType {
  value: any;
  onChange?: (data: any) => void;
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
      style={{width: '100%'}}
    >
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}
