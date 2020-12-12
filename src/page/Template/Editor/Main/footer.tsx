import * as React from 'react';
import {Button, Form} from "antd";
import * as Style from './style.scss';

export function getFooterString() {
    return <Form.Item>
        <div className={Style.footer}>
            <Button>取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
        </div>
    </Form.Item>;
}
