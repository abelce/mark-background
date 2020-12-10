import { Form, InputNumber } from "antd";
import * as React from "react";
import { IPropComponent } from ".";
import Wrapper from "./Wrapper";

const name = 'col';
function ColSlider() {
  return (
    <Form.Item label="栅格" name={name}>
      <InputNumber
        min={0}
        max={24}
      />
    </Form.Item>
  );
}


export default Wrapper(name)(ColSlider);