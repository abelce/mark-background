import React from 'react';
import {Link} from 'react-router-dom';
import { Avatar, Divider } from 'antd';

function Author({data}) {
    return <div className="author_block">
        <Link to={`/user/${data.id}`} className="user_info">
            <Avatar srv={data.avatar}/>
            <div className="username">{data.name}</div>
        </Link>
        
    </div>
}

function SidebarBlock({title, body}) {
    return<div className="sidebar_block">
        <div className="block_title">{title}</div>
        <Divider className="divider"/>
        <div className="block_body">{body}</div>
    </div>
}

const data = {
    avatar: "",
    name: 'vwood',
    id: 'asfafasdf'

}

export default function Sidebar({}) {

    return <div className="sidebar">
        <SidebarBlock
        title="关于作者"
        body={<Author data={data}/>}/>
    </div>
}