import React, { useState, useEffect } from 'react';
import { changeBaseInfo } from '@domain/user/action';
import UserStore from '@domain/user/store';
import { CHANGE_USER_BASEINFO  } from '@common/constants/user';
import { Form, Button, Input, message } from 'antd';
import './style.scss';

function Info({ form: { getFieldDecorator, validateFieldsAndScroll } }) {
    const data = UserStore.current || {}
    const [loading, setLoading] = useState(false);

    const onChange = () => {
        const { type } = UserStore.lastAction;
        switch (type) {
            case CHANGE_USER_BASEINFO:
                message.success('更新成功');
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
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;    
            }
            setLoading(true);
            changeBaseInfo(values)
            .catch(err => {
                message.error('更新失败');
                setLoading(false);
            })
        })
    }
    return <div className="info">
        <Form 
            className="form"
            onSubmit={handleSubmit}>
            <Form.Item
                label="昵称">
                {
                    getFieldDecorator('name', {
                        initialValue: data.name
                    })(<Input disabled/>)
                }
            </Form.Item>
            <Form.Item
                label="微信">
                {
                    getFieldDecorator('weiChat', {
                        rules: []
                    })(<Input />)
                }
            </Form.Item>
            <Form.Item
                label="github">
                {
                    getFieldDecorator('github', {
                        rules: []
                    })(<Input />)
                }
            </Form.Item>
            <Form.Item
                label="个人网站">
                {
                    getFieldDecorator('website', {
                        rules: [
                            {
                                type: 'url',
                                message: '网站格式不正确'
                            }
                        ]
                    })(<Input />)
                }
            </Form.Item>
            <Form.Item
                label="地址">
                {
                    getFieldDecorator('address', {

                    })(<Input />)
                }
            </Form.Item>
            <Form.Item
                label="签名(用户文章右下角签名)">
                {
                    getFieldDecorator('signature', {})(<Input />)
                }
            </Form.Item>
            <Form.Item
                label="描述">
                {
                    getFieldDecorator('description', {})(<Input />)
                }
            </Form.Item>
            <Form.Item>
                <div className="submit">
                <Button
                    type="primary"
                    htmlType="submit" 
                    loading={loading}>保存</Button>
                </div>
            </Form.Item>
        </Form>
    </div>
}

export default Form.create()(Info);