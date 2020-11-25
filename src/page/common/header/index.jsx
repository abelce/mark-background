import React from 'react';
import cn from 'classnames';
import './style.scss';

const types = [
    {
        label: '最近',
        value: '-createdTime'
    },
    {
        label: '热门',
        value: '-likeCount'
    }
]


function Header({value, onClick}) {
    function handleClick(data) {
        onClick && onClick(data);
    }

    return <ul className="type_header">
                {
                    types.map(tp => <li
                            key={tp.value} 
                            onClick={() => handleClick(tp.value)} 
                            className={cn('item', {'item_active': value === tp.value})}>
                                <a>{tp.label}</a>
                            </li>)
                }
    </ul>
}

export default Header;