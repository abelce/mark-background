import * as React from "react";
import { Select } from "antd";
import {ENUM_FIELFTYPE} from '@gen/enumObjects';

const { Option } = Select;

const options = Reflect.ownKeys(ENUM_FIELFTYPE).map(key => ({
  label: ENUM_FIELFTYPE[key].description,
  value: ENUM_FIELFTYPE[key].value,
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
