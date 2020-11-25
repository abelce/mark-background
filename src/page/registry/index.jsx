import React from 'react';
import { Input, Form, Button, notification, message } from 'antd';
import { registry } from '@domain/user/action';
import UserStore from '@domain/user/store';
import {
    REGISTRY,
} from '@common/constants/user';
import cn from 'classnames';
import "./style.scss";

class Registry extends React.Component {

    state = {
        loading: false,
    }

    componentDidMount() {
        this.subscription = UserStore.addListener(this.onChange)
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    onChange = () => {
        const {type} = UserStore.lastAction;
        const {history} = this.props;
        if (type === REGISTRY) {
            notification.success({
                message: '注册成功',
                description: '注册成功，请登录!'
            })
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            this.setState({
                loading: true,
            })

            registry({
                ...values,
            }).catch(() => {
                this.setState({
                    loading: false,
                })
            })
        })

    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { loading } = this.state;

        return (
            <main className="login">
                <div className="login_paper">
                    <div>
                        <h1>注册</h1>
                        <Form>
                            <Form.Item
                                label="用户名"
                            >
                                {
                                    getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名必填'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="输入用户名" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                label="邮箱"
                            >
                                {
                                    getFieldDecorator('email', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '邮箱必填'
                                            },
                                            {
                                                type: 'email',
                                                message: '邮箱格式不正确'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="输入邮箱" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                label="密码"
                            >
                                {
                                    getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码必填'
                                            },
                                        ]
                                    })(
                                        <Input placeholder="输入密码" type="password" />
                                    )
                                }
                            </Form.Item>
                            <div className="login_submit">
                                <Button
                                    type="primary"
                                    loading={loading}
                                    onClick={this.handleSubmit}
                                >
                                    注册
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="login_intro">
                    <div className="login_intro_content">
                        <p>一个用于收集日常生活和工作的笔记本</p>
                        <a
                            className="login_intro_learnmore"
                            href="javascript:;">LEARN MORE</a>
                    </div>
                </div>
            </main>
        )
    }
}

export default Form.create()(Registry);