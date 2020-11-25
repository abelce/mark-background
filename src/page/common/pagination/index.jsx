import React from 'react'
import {Pagination} from 'antd';
import './style.scss';

export default function MyPagination(props) {
    return <div className="pagination">
    <Pagination {...props}/>
    </div>
}
