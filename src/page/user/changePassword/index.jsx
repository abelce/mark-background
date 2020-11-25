import React, { useState, useEffect } from 'react';
import { changePassword } from '@domain/user/action';
import UserStore from '@domain/user/store';
import { CHANGE_PASSWORD } from '@common/constants/user';
import { Button, Form, Input, notification } from 'antd';
import Continer from '../container';
import './style.scss';

function ChangePassword({ form: { getFieldDecorator, validateFieldsAndScroll } }) {

    const [loading, setLoading] = useState(false);

    const onChange = () => {
        const { type } = UserStore.lastAction;
        switch (type) {
            case CHANGE_PASSWORD:
                notification.success({
                    message: '提示',
                    description: '更新成功'
                })
                setLoading(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const subscription = UserStore.addListener(onChange);
        return () => {
            subscription.remove();
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
       validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            setLoading(true);
            changePassword(values)
            .catch(() => {
                setLoading(false);
            })
        })
    }

    return (
        <Continer
        header={<h2>修改密码</h2>}>
            <Form onSubmit={handleSubmit}>
                <Form.Item
                    label="旧密码"
                >
                    {
                        getFieldDecorator('oldPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '旧密码必填'
                                },
                            ]
                        })(
                            <Input placeholder="输入旧密码" type="password" />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label="新密码"
                >
                    {
                        getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '新密码必填'
                                },
                            ]
                        })(
                            <Input placeholder="输入新密码" type="password" />
                        )
                    }
                </Form.Item>
                <div>
                    <Button 
                        type="primary" 
                        loading={loading}
                        htmlType="submit">
                        确定
                    </Button>
                </div>
            </Form>
        </Continer>
    )
}

export default Form.create()(ChangePassword);