import * as React from 'react';
import { Radio, Form } from 'antd';

const options = [
    { label: 'small', value: 'small' },
    { label: 'default', value: 'default' },
    { label: 'large', value: 'large' },
  ];

export default function SizeRadio() {
    return <Form.Item label="必填" name="required"><Radio.Group
    options={options}
    optionType="button"
    buttonStyle="solid"
  />
  </Form.Item>
}