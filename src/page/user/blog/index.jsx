import React from 'react';
import Card from '@page/common/card';
import {
    GET_BLOGS,
    DELETE_BLOG,
    GET_BLOGS_LIST,
} from '@common/constants/blog.js';
import BlogStores from '@domain/blog/store';
import UserStore from '@domain/user/store';
import { getBlogsList, deleteBlog, blogClear } from '@domain/blog/actions';
import { isOwner } from '@utils';
import Sidebar from './sidebar';
import {Divider} from 'antd';
import { Link } from 'react-router-dom';
import Pagination from '@page/common/pagination'
import './style';

function NewArticle() {
    const pathname = location.pathname;
    if (pathname === '/users/links') {
        return <Link to="/links/create">添加外链</Link>
    }

    if (pathname === '/users/essay') {
        return <Link to="/essay/create">添加随笔</Link>
    }

    return <Link to="/blog/create">新建文章</Link>
}

class Blog extends React.Component {
    state = {
        data: [],
        total: 0,
    }

    pageSize = 10

    blogRef = React.createRef();

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.subscription = BlogStores.addListener(this.onChange);
        this.loadData();
    }

    componentWillUnmount() {
        blogClear();
    }

    isDraft = () => {
        return this.props.location.pathname === '/users/drafts';
    }

    isLinks = () => {
        return this.props.location.pathname === '/users/links';
    }

    isEssay = () => {
        return this.props.location.pathname === '/users/essay';
    }

    getTitle = () => {
        const pathname = this.props.location.pathname;

        switch (pathname) {
            case '/users/drafts':
                return "草稿箱";
            case '/users/links':
                return "所有外链"
            case '/users/essay':
                return '随笔';
            default:
                return "所有文章";
        }
    }

    getFilter = () => {
        const pathname = this.props.location.pathname;
        let filter = `operatorID eq '${UserStore.current.id}'`
        switch (pathname) {
            case '/users/drafts':
                return filter + " and isDraft eq 'true'";
            case '/users/links':
                return filter + " and type eq 'link'"
            case '/users/essay':
                return filter + " and type eq 'essay'"
            default:
                return filter + " and type eq 'blog'";
        }
    }

    loadData = (page = {}) => {
        const params = {
            ...page,
            filter: this.getFilter(),
        }
        getBlogsList(params);
    }

    onChange = () => {
        const { type } = BlogStores.lastAction;
        switch (type) {
            case GET_BLOGS_LIST:
            case GET_BLOGS:
                this.setState({
                    data: BlogStores.blogs,
                    total: BlogStores.total,
                });
                break;
            case DELETE_BLOG:
                setTimeout(() => {
                    this.loadData({
                        'page[offset]': 0,
                        'page[limit]': this.pageSize,
                    });
                })
                break;
            default:
                break;
        }
    }

    handleDelete = articleID => {
        deleteBlog(articleID);
    }

    handlePageChange = (page) => {
        this.loadData({
            'page[offset]': (page - 1) * this.pageSize,
            'page[limit]': this.pageSize,
        })
    }

    render() {
        const { data, total } = this.state;
        return (
            <div className="blog_container">
                <Sidebar />
                <div ref={this.blogRef} className="blog">
                    <div className="blog_header">
                        <h1>{this.getTitle()}</h1>
                        <NewArticle />
                    </div>
                    <Divider />
                    {
                        data.map(blog => <Card
                            editable={isOwner(blog.operatorID)}
                            key={blog.id}
                            data={blog}
                            onDelete={this.handleDelete} />)
                    }
                    <Pagination
                        size="small"
                        total={total}
                        pageSize={this.pageSize}
                        defaultCurrent={1}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

export default (props) => <Blog {...props} key={props.location.pathname} />;