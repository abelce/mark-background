import React from 'react'
import cn from 'classnames';
import './style.scss';

/**
 * 
 * @param {*} props 
 * total,
 * currentTotal:
 *
 */
export default function MoreButton({onClick,total, currentTotal }) {

    return <div className={cn('moreButton', {'btn_close': total <= currentTotal})}>
        <a 
        onClick={onClick}
        href="javascript:;"
        >
            更多...
        </a>
    </div>
}
