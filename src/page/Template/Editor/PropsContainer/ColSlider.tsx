import { Form, InputNumber } from "antd";
import * as React from "react";

export default function ColSlider() {
  return (
    <Form.Item label="栅格" name="col">
      <InputNumber
        min={0}
        max={24}
      />
    </Form.Item>
  );
}
