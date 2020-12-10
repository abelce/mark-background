import * as React from "react";
import { Radio, Form } from "antd";
import Wrapper from "./Wrapper";

const options = [
  { label: "small", value: "small" },
  { label: "default", value: "default" },
  { label: "large", value: "large" },
];
const name = "size";

function SizeRadio() {
  return (
    <Form.Item label="必填" name={name}>
      <Radio.Group options={options} optionType="button" buttonStyle="solid" />
    </Form.Item>
  );
}

export default Wrapper(name)(SizeRadio);
