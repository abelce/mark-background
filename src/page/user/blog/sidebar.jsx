import React from 'react';
import Statistic from './statistic';
import UserStore from '@domain/user/store';
import { Link } from 'react-router-dom';
import {Divider, Avatar} from 'antd';

function Sidebar() {
    let user = UserStore.current;
    if (!user) {
        user = {}
    }

    return (
        <div className="blog_sidebar">
            <div className="blog_sidebar_info">
                <div className="blog_sidebar_user">
                    <Avatar 
                        alt="Remy Sharp" 
                        src={user.logoImage}>
                            {!user.logoImage ? (user.name ? user.name[0] : '') : null}
                    </Avatar>
                    <div className="name">
                        <strong>{user.name}</strong>
                        <p>{user.description}</p>
                    </div>
                </div>
                <Divider/>
                <Statistic />
            </div>
            <div className="blog_sidebar_actions">
                <Link to="/users/blogs" className="link_button_green">
                    所有文章
                </Link>
                <Link to="/users/links" className="link_button_green">
                    我的外链
                </Link>
                <Link to="/users/essay" className="link_button_green">
                    随笔
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;