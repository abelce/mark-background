import { Form, Slider, Switch } from 'antd';
import * as React from 'react';
import Wrapper from './Wrapper';

const name = 'required';
function Required() {
    return <Form.Item label="必填" name={name}>
    <Switch size="small"/>
</Form.Item>
}

export default Wrapper(name)(Required);