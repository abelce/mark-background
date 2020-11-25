import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '@domain/user/action';
import UserStore from '@domain/user/store';
import LocalStorage from 'store';
import { Input, Button, Form } from 'antd';
import "./style.scss";

class Login extends React.Component {

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
        if (LocalStorage.get('user')) {
            location.href = '/';
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
    
            login(values)
            .catch(err => {
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
                        <h1>登陆</h1>
                        <Form>
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
                                    登陆
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <Link className="login_signup" to="/registry">
                        没有账号? 注册
                    </Link>
                </div>
                <div className="login_intro">
                    <div className="login_intro_content">
                        <p>一个用于记录程序员工作、生活的网站</p>
                        <a
                            className="login_intro_learnmore"
                            href="javascript:;">LEARN MORE</a>
                    </div>
                </div>
            </main>
        )
    }
}

export default Form.create()(Login);