import {
    Store
} from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    LIKE_POST,
    LIKE_CHECK,
    LIKE_COUNT_GET
} from '@common/constants/like.js';
import {
    BLOG_LIKE
} from '@common/constants/blog.js';

class BlogStores extends Store {

    // 点赞总数 sourceID/count
    _likecount = {}
    // 点赞sourceID/(true/false)
    _like = {}

    constructor() {
        super(AppDispatcher);
    }

    /**
     * flag: 1, 点赞， -1: 取消点赞
     */
    dealLike = ({count, sourceID}) => {
        this._likecount[sourceID] = count;
        this._like[sourceID] = !this._like[sourceID];
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
            case LIKE_COUNT_GET: 
                this._likecount[payload.sourceID] = payload.count;
                this.__emitChange();
                break;
            case LIKE_CHECK:
                this._like[payload.sourceID] = payload.like;
                this.__emitChange();
                break;
            case LIKE_POST:
                this.dealLike(payload);
                this.__emitChange();
                break;
            case BLOG_LIKE:
                this.dealLike(payload);
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    getCount(sourceID) {
        return this._likecount[sourceID];
    }

    checkLike(sourceID) {
        return this._like[sourceID];
    }
}

export default new BlogStores();