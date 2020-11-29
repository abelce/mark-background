import { Form, Slider } from 'antd';
import * as React from 'react';


interface WidthValue {
    type: "fixed" | "per"; // 固定宽度、百分比
    value: number;
  }
  interface IWidthSelector {
    value: WidthValue;
    onChange: (value: WidthValue) => void;
  }
  // function WidthSelector(props: IWidthSelector) {
  //   const { type, value, onChange } = props;
  
  // }
  
  export default function WidthSlider() {
      return <Form.Item label="宽度" name="width">
          <Slider min={1} max={24}/>
      </Form.Item>
  }