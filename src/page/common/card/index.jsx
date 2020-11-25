import React from 'react';
import './style';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Delete from '@page/common/delete';
import { Icon } from 'antd';
class Card extends React.Component {

    handleConfirm = () => {
        const { onDelete, data } = this.props;
        if (onDelete) {
            onDelete(data.id)
        }
    }

    getEditLink = () => {
        const pathname = location.pathname;
        const { data: { id } } = this.props;
        switch (pathname) {
            case '/users/blogs':
                return `/blog/${id}/edit`;
            case '/users/links':
                return `/links/${id}/edit`;
            case '/users/drafts':
                return '/users/drafts';
            case '/users/essay':
                return `/users/${id}/essay`;
        }
    }

    getGotoLink = () => {
        const { data: { id, type, url, title } } = this.props;
        switch (type) {
            case 'link':
                return <Link
                to={`/articles/${id}`}
                className="repo-title">
                {title}
            </Link>
            default:
                return <Link
                    to={`/articles/${id}`}
                    className="repo-title">
                    {title}
                </Link>
        }
    }

    getTypeText = () => {
        switch (this.props.data.type) {
            case 'blog':
                return '博客';
            case 'essay':
                    return '随笔';
            case 'link':
                return '链接';
        }
    }

    render() {
        const { data, editable } = this.props;
        return (
            <div className="card">
                <div className="repo-header">
                    <span className="repo-type">[{this.getTypeText()}]</span>
                    <h1>
                        {this.getGotoLink()}
                    </h1>
                </div>
                {/* <div className="repo-desc">{data.description}</div> */}
                <div className="repo-meta">
                    <span className="info-block">
                        <i className="iconfont icon-time"></i>
                        &nbsp;
                        {dayjs(data.createdTime).format('YYYY-MM-DD HH:mm')}
                    </span>
                    <div>
                        <span className="info-block">
                            <Icon type="like" />
                            <span>{data.likeCount || 0}</span>
                        </span>
                        {/* <span className="info-block">
                            <Icon type="eye" />
                            <span>{data.viewCount || 0}</span>
                        </span> */}
                    </div>
                    {
                        editable &&
                        <div className="actions">
                            <Delete message="确定删除?"
                                description="删除将不再展示"
                                onOk={this.handleConfirm} />
                            <Link to={this.getEditLink()}>编辑</Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Card;