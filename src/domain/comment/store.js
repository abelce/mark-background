import {
    Store
} from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    GET_COMMENT_BY_ID,
    GET_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_CHILDREN_COMMENTS,
} from '@common/constants/comment.js';
import Comment, {formatComment} from '@domain/comment/comment.js';

class CommentStores extends Store {

    // 存储以及评论
    _comments = [];
    // 维护评论的key/value关系
    _commentMaps = {};
    // 存储耳机评论
    _children = {};
    // 最近一次的action
    _lastAction = {};

    // 请求状态
    _fetching = {};

    _total = 0;

    constructor() {
        super(AppDispatcher);
    }

    dealComments = (comments) => {
        if (Array.isArray(comments)) {
            comments.map(ct => {
                const item = new formatComment({
                    id: ct.id,
                    ...ct.attributes,
                })
                // 如果存在parentID说明是子级评论
                if (item.parentID) {
                    // 判断该评论是否存在，如果存在则覆盖，不存在则直接插入 
                    if (!this._commentMaps[item.id]) {
                        this._commentMaps[item.parentID].children.data.push(item);
                    }
                } else {
                    if (!this._commentMaps[item.id]) {
                        this._comments.push(item);
                    }
                }
                this._commentMaps[item.id] = item;
            })
        }
    }

    addComment = data => {
        const item = new formatComment({
            id: data.id,
            ...data.attributes,
        })
        if (item.parentID) {
            this._commentMaps[item.parentID].children.data.push(item);
            this._commentMaps[item.parentID].children.total++;
        } else {
            this._comments.unshift(item);
            this._commentMaps[item.id] = item;
        }
    }

    __onDispatch(_data) {
        const {
            type,
            payload = null,
        } = _data;
        this._lastAction = {
            type,
            payload,
        };
        switch (type) {
            case GET_COMMENTS:
                this.dealComments(payload.data);
                this._total = payload.total;
                this.__emitChange();
                break;
            case CREATE_COMMENT:
                this.addComment(payload);
                this.__emitChange();
                break;
            case GET_CHILDREN_COMMENTS:
                this.dealComments(payload.data);
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    get comments() {
        return this._comments || [];
    }

    get total() {
        return this._total;
    }

    getChildren(parentID) {
        return this._children[parentID] || [];
    }

    isFetching(type) {
        return this._fetching[type];
    }
}

export default new CommentStores();