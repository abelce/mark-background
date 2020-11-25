import {
    Store
} from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    GET_BLOG_BY_ID,
    GET_BLOGS,
    SAVE_BLOG,
    UPDATE_BLOG,
    DELETE_BLOG,
    GET_BLOGS_LIST,
    BLOG_LIKE,
    BLOG_CLEAR,
} from '@common/constants/blog';
import {
    FormatBlog
} from '@domain/blog/blog.js';

class BlogStores extends Store {

    _blogIds = [];
    _blogs = {};
    // 最近一次的action
    _lastAction = {};

    // 请求状态
    _fetching = {};

    _total = 0;

    constructor() {
        super(AppDispatcher);
    }

    dealBlogs = (blogs) => {
        this._total = blogs.total;
        if (Array.isArray(blogs.data)) {
            blogs.data.forEach((blog) => {
                this._blogIds.push(blog.id);
                this._blogs[blog.id] = FormatBlog(blog);
            })
        }
    }

    dealBlog = (blog) => {
        if (typeof blog === 'object' && blog) {
            this._blogs[blog.id] = FormatBlog(blog);
        }
    }

    deleteBlog = (id) => {
        this._blogIds = this._blogIds.filter(blogId => blogId !== id);
        Reflect.deleteProperty(this._blogs, id);
    }

    dealLike = ({
        count,
        sourceID
    }) => {
        this._blogs[sourceID].likeCount = count;
    }

    clearBlog = () => {
        this._blogIds = [];
        this._blogs = {};
        this._total = 0;
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
            case GET_BLOG_BY_ID:
                this.dealBlog(payload);
                this.__emitChange();
                break;
            case GET_BLOGS:
                this.dealBlogs(payload);
                this.__emitChange();
                break;
            case SAVE_BLOG:
            case UPDATE_BLOG:
                this.dealBlog(payload);
                this.__emitChange();
                break;
            case DELETE_BLOG:
                this.deleteBlog(payload);
                this.__emitChange();
                break;
            case GET_BLOGS_LIST:
                this.dealBlogs(payload);
                this.__emitChange();
                break;
            case BLOG_LIKE:
                this.dealLike(payload);
                this.__emitChange();
                break;
            case BLOG_CLEAR:
                this.clearBlog();
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    get blogs() {
        return this._blogIds.map(id => this._blogs[id]) || [];
    }

    get total() {
        return this._total;
    }

    getById = (id) => {
        return this._blogs[id] || null;
    }

    isFetching(type) {
        return this._fetching[type];
    }
}

export default new BlogStores();