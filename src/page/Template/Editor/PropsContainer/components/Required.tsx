import { Form, Slider, Switch } from 'antd';
import * as React from 'react';


export default function Required() {
    return <Form.Item label="必填" name="required">
    <Switch size="small"/>
</Form.Item>
}