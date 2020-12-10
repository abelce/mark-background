import { Form, InputNumber } from "antd";
import * as React from "react";
import Wrapper from './Wrapper';

const name = 'width';
function WidthSlider() {
  return (
    <Form.Item label="宽度" name={name}>
      <InputNumber
        min={0}
        max={100}
        formatter={(value) => `${value}%`}
        parser={(value) => value.replace("%", "")}
      />
    </Form.Item>
  );
}


export default Wrapper(name)(WidthSlider);