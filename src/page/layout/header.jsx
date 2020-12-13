import React from 'react';
import Style from './style';
import { NavLink, Link, withRouter } from 'react-router-dom';
import UserStore from '@domain/user/store';
import { logout } from '@domain/user/action';
import { Avatar, Dropdown, Menu } from 'antd';

const Navs = [
    // {
    //     label: '首页',
    //     value: '/',
    // },
    {
        label: '实体',
        value: '/Entity/list',
    },
    {
        label: '模版',
        value: '/Template/list'
    },
    {
        label: '常量',
        value: '/Constant/list'
    },
    {
        label: '枚举',
        value: '/Enum/list'
    }
];

const menu = (
    <Menu>
        {/* <Menu.Item key="0">
            <Link to="/users/blogs">我的创作</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/users/settings/changepassword">编辑资料</Link>
        </Menu.Item> */}
        <Menu.Item key="2">
            <a href="javascript:;" onClick={logout}>退出</a>
        </Menu.Item>
    </Menu>
);

class Header extends React.Component {

    state = {
        anchorEl: null,
        username: '',
    }

    componentDidMount() {
        this.subscription = UserStore.addListener(this._onChange)
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    _onChange = () => {
        this.setState({
            username: UserStore.name,
        })
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    handleSettings = (path) => {
        this.handleClose();
        this.props.history.push(path);
    }

    handleLogout = () => {
        this.handleClose();
        logout();
    }

    handleWrite = () => {
        UserStore.user
            ? window.open(`/blog/create?${+new Date()}`, '_blank')
            : logout();
    }


    render() {
        return (
            <div className={Style.header}>
                <div className={Style.header_links}>
                    <Link to="/">
                        {/* <img className="header_logo" src={Logo} /> */}
                        <h2 className={Style.header_logo}></h2>
                    </Link>
                    <ul>
                        {
                            Navs.map(link => <li key={link.value}>
                                <NavLink
                                    exact={true}
                                    to={`${link.value}`}
                                    activeClassName={Style.active}
                                    >
                                    <span>{link.label}</span>
                                </NavLink>
                            </li>)
                        }
                    </ul>
                </div>
                <div>
                    {
                        !UserStore.current
                            ? <div className={Style.header_login_registry}>
                                <Link to="/login">登陆</Link>
                                <Link to="/registry">注册</Link>
                            </div>
                            : <div>
                                <Dropdown
                                    overlay={menu}
                                    trigger={['click']}
                                    placement="bottomRight">
                                    <Avatar
                                        alt={UserStore.name}
                                        src={UserStore.avatar}
                                        className={Style.header_avatar} />
                                </Dropdown>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
