import { Form, Switch } from "antd";
import * as React from "react";
import Wrapper from "./Wrapper";

const name = "readonly";
function Readonly() {
  return (
    <Form.Item label="只读" name={name} valuePropName="checked">
      <Switch size="small" />
    </Form.Item>
  );
}
export default Wrapper(name)(Readonly);
