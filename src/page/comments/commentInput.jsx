import React from 'react';
import {createComment} from '@domain/comment/actions'
import {Button, Input} from 'antd';
import OperatorStore from '@domain/user/store';
import Store from '@domain/comment/store';
import {
    CREATE_COMMENT,
} from '@common/constants/comment.js';

class CommentInput extends React.Component {

    ref = React.createRef()

    state = {
        loading: false,
    }

    componentDidMount() {
        this.subscript = Store.addListener(this.onChange);
    }

    componentWillUnmount() {
        this.subscript.remove();
        this.subscript = null;
    }

    onChange = () => {
        const {type} = Store.lastAction
        if (type === CREATE_COMMENT) {
            this.setState({
                loading: false,
            })
            this.ref.current.textAreaRef.value = '';
        }
    }

    handleCreate = () => {
        const {sourceID, to = {}, parentID} = this.props;
        const value = this.ref.current.textAreaRef.value
        if (!value.trim()) {
            return;
        }
        createComment({
            sourceID,
            fromAvatar: OperatorStore.avatar,
            fromName: OperatorStore.name,
            content: value,
            toID: to.id,
            toAvatar: to.avatar,
            toName: to.name,
            parentID
        })
        this.setState({
            loading: true,
        })
    }

    render() {
        return <div className="commentInput">
            <Input.TextArea rows={4} ref={this.ref}/>
            <div className="tools">
                <div className="actions">
                    <Button 
                        type="primary" 
                        loading={this.state.loading}
                        onClick={this.handleCreate}>评论</Button>
                </div>
            </div>
        </div>
    }
}

export default CommentInput;