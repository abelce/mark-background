import React from 'react';
import Card from '../common/card';
import {
    GET_BLOGS_LIST,
} from '@common/constants/blog';
import BlogStores from '@domain/blog/store';
import {getBlogsList, blogClear} from '@domain/blog/actions';
import TypeHeader from '@page/common/header';
import {getUrlQueryObj} from '@utils';
import qs from 'qs';
import './style';
import MoreButton from '@page/common/moreButton';

class Blog extends React.Component {
    state = {
        data: [],
        total: 0,
        sort: '-createTime'
    }

    pageSize = 100

    blogRef = React.createRef();

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.subscription = BlogStores.addListener(this.onChange);
        this.loadData();
    }

    componentWillUnmount() {
        blogClear();
    }

    getFilter = () => {
        return `type in ('blog', 'link')`;
    }

    getSort = () => {
        return `${getUrlQueryObj().sort || '-createdTime'}`
    }

    loadData = (page={
        'page[limit]': this.pageSize,
    }) => {
        getBlogsList({ ...page, filter: this.getFilter(), sort: this.getSort()});
    }

    onChange = () => {
        const {type} = BlogStores.lastAction;
        switch(type) {
            case GET_BLOGS_LIST:
                this.setState({
                    data: BlogStores.blogs,
                    total: BlogStores.total,
                });
                break;
            default:
                break;
        }
    }
    handlePageChange = () => {
        const {data} = this.state;
        this.loadData({
            'page[offset]': data.length,
            'page[limit]': this.pageSize,
        })
    }

    handleTypeChange = (data) => {
        const search = getUrlQueryObj();
        search.sort = data;
        this.changeSearch(search);
        this.loadData();
    }

    changeSearch = (search={}) => {
        this.props.history.push({
            search: qs.stringify(search),
        })
    }

    render() {
        const { data, total } = this.state;
        return (
            <div ref={this.blogRef} className="blog">
                {/* <TypeHeader value={this.getSort()} onClick={this.handleTypeChange}/> */}
                {
                    data.map(blog => <Card
                        key={blog.id}
                        data={blog}/>)
                }
                    {/* <Pagination
                        size="small"
                        total={total}
                        pageSize={this.pageSize}
                        defaultCurrent={1}
                        onChange={this.handlePageChange}
                    /> */}
                    <MoreButton
                    total={total}
                    currentTotal={data.length}
                    onClick={this.handlePageChange}/>
            </div>
        )
    }
}

export const BlogBase = Blog

export default (props) => <Blog {...props} key={props.location.pathname}/>;