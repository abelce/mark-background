/*
 * File: Required copy.tsx
 * Project: wait
 * File Created: Sunday, 29th November 2020 1:08:00 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Sunday, 29th November 2020 1:08:00 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
import { Form, Slider, Switch } from 'antd';
import * as React from 'react';


export default function Readonly() {
    return <Form.Item label="只读" name="readonly" valuePropName="checked">
    <Switch size="small"/>
</Form.Item>
}