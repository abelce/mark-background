import React from 'react';
import PropTypes from 'prop-types';
import {getCommentList, getChildrenList} from '@domain/comment/actions'
import List from './list';
import Store from '@domain/comment/store';
import CommentInput from './commentInput';

class Comments extends React.Component {

    static propTypes = {
        sourceID: PropTypes.string.isRequired,
    }

    state = {
        comments: [],
        total: 0,
    }

    componentDidMount() {
        this.subscript = Store.addListener(this.onChange);
        this.loadMore();
    }

    componentWillUnmount() {
        this.subscript.remove();
        this.subscript = null;
    }

    onChange = ()=> {
        this.setState({
            comments: Store.comments,
            total: Store.total,
        })
    }

    loadMore = (params = {}) => {
        const queryParams = {
            filter: `sourceID eq '${this.props.sourceID}' and parentID eq ''`,
            sort: '-createdTime',
            'page[limit]': 10,
            'page[offset]':this.state.comments.length,
            ...params
        }
        getCommentList(queryParams);
    }

    loadChildren = (params = {}) => {
        const queryParams = {
            sort: 'createdTime',
            'page[limit]': 9999,
            'page[offset]':0,
            ...params
        }
        getChildrenList(queryParams);
    }

    render() {
        return <div className="comments">
            <CommentInput sourceID={this.props.sourceID}/>
            <List 
            comments={this.state.comments}
            onLoadChildren={this.loadChildren}
            onLoadMore={this.loadMore}
            total={this.state.total}/>
        </div>
    }
}

export default Comments;