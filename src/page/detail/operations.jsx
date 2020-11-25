import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {likeCheck} from '@domain/like/actions';
import {blogLikePost} from '@domain/blog/actions';
import LikeStore  from '@domain/like/store';
import {Icon} from 'antd';
import cn from 'classnames';

function Item({icon, text, onClick, checked=false}) {
    return <a
        href="javascript:;" 
        className={cn('operations_item', {'operations_item_active': checked})}
        onClick={onClick}>
        {icon}
        <span>{text}</span>
    </a>
}

class Operations extends Component {
    static propTypes = {
        sourceID: PropTypes.string.isRequired,
    }
    state = {
        // likeCount: 0,
        like: false,
    }
    componentDidMount() {
        this.subscription = LikeStore.addListener(this.onChange);
        setTimeout(() => {
            likeCheck(this.props.sourceID); 
        }, 10);
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    onChange = () => {
        this.setState({
            // likeCount: LikeStore.getCount(this.props.sourceID),
            like: LikeStore.checkLike(this.props.sourceID),
        })
    }

    handleLike = () => {
        blogLikePost({id: this.props.sourceID})
    }

    render() {
        const {like} = this.state;
        const {likeCount} = this.props;
        return <div className="operations_list">
            <Item 
                icon={<Icon type="like" />} 
                text={likeCount} 
                checked={like}
                onClick={this.handleLike}/>
        </div>
    }
}

export default Operations;