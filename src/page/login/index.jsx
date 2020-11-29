import React from "react";
import { Link } from "react-router-dom";
import { login } from "@domain/user/action";
import UserStore from "@domain/user/store";
import LocalStorage from "store";
import { Input, Button, Form } from "antd";
import * as Style from "./style.scss";

class Login extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.subscription = UserStore.addListener(this.onChange);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  onChange = () => {
    if (LocalStorage.get("user")) {
      location.href = "/";
    }
  };

  handleSubmit = (values) => {
    this.setState({
      loading: true,
    });

    login(values).catch((err) => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <main className={Style.login}>
        <div className={Style.login_paper}>
          <div>
            <h1>登陆</h1>
            <Form onFinish={this.handleSubmit}>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "邮箱格式不正确",
                  },
                ]}
              >
                <Input placeholder="输入邮箱" />
              </Form.Item>
              <Form.Item label="密码" name="password">
                <Input placeholder="输入密码" type="password" />
              </Form.Item>
              <Form.Item >
              <div className={Style.login_submit} htmlType="submit">
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  sizes="small"
                  onClick={this.handleSubmit}
                >
                  登陆
                </Button>
              </div>
              </Form.Item>
            </Form>
          </div>
          <Link className={Style.login_signup} to="/registry">
            没有账号? 注册
          </Link>
        </div>
        <div className={Style.login_intro}>
          <div className={Style.login_intro_content}>
            <p>一个用于记录程序员工作、生活的网站</p>
            <a className={Style.login_intro_learnmore} href="javascript:;">
              LEARN MORE
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
