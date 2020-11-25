import React from 'react';
import { GET_BLOG_BY_ID, BLOG_LIKE } from '@common/constants/blog';
import { getBlogById } from '@domain/blog/actions.js';
import BlogStores from '@domain/blog/store';
import Post from './post';
import Sidebar from './sidebar';
import './style';

class Detail extends React.Component {
    state = {
        // 文章id
        id: '',
        data: null,
    }

    constructor(props) {
        super(props);
        const { match } = this.props;
        this.state.id = match.params.blogId;
    }

    componentDidMount() {
        this.subscription = BlogStores.addListener(this.onChange);
        getBlogById(this.state.id);
    }

    onChange = () => {
        const { type } = BlogStores.lastAction;
        switch (type) {
            case GET_BLOG_BY_ID:
            case BLOG_LIKE:
                let data = BlogStores.getById(this.state.id)
                this.setState({
                    data: data
                })
        }
    }


    render() {
        const {data} = this.state;
        if (!data) {
            return null;
        }
        return <div className="detail_container">
            <div>
                <Post data={data}/>
            </div>
            <Sidebar/>
        </div>
    }
}

export default Detail;