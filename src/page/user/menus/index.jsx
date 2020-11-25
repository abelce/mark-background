import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './style.scss';

const MENUS = [
    {
        link: '/users/settings/changepassword',
        label: '修改密码'
    },
    {
        link: '/users/settings/info',
        label: '个人信息'
    },
    {
        link: '/users/settings/changeAvatar',
        label: '修改头像'
    },
]

function Menus() {
    return <ul className="menus">
        {
            MENUS.map(menu => <li>
                <Link
                    key={menu.link}
                    className={cn('menu_item', {'menu_active': location.pathname === menu.link})}
                    to={menu.link}>
                        <span>{menu.label}</span>
                </Link>
            </li>)
        }
    </ul>
}

export default Menus;