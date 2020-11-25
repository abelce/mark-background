import AppDispatcher from '@common/utils/AppDispatcher';
import {
    GET_BLOGS,
    DELETE_BLOG,
    GET_BLOG_BY_ID,
    SAVE_BLOG,
    UPDATE_BLOG,
    GET_BLOGS_LIST,
    BLOG_LIKE,
    BLOG_CLEAR,
} from '@common/constants/blog.js';
import {
    getBlogAPI,
    getBlogsAPI,
    saveBlogAPI,
    updateBlogAPI,
    deleteBlogAPI,
    getBlogsListAPI,
    blogLikeAPI,
} from '@common/api/blogApi.js';

export const getBlogById = function (id, params) {
    return getBlogAPI(id, params)
        .then((data) => {
            AppDispatcher.dispatch({
                type: GET_BLOG_BY_ID,
                payload: data.data,
            });
        })
}

export const getBlogs = function (params) {
    return getBlogsAPI(params).then((data) => {
        AppDispatcher.dispatch({
            type: GET_BLOGS,
            payload: data,
        });
    })
}

export const saveBlog = function (data) {
    return saveBlogAPI(data)
        .then((data) => {
            AppDispatcher.dispatch({
                type: SAVE_BLOG,
                payload: data.data,
            });
        })
}

export const updateBlog = function (data) {
    return updateBlogAPI(data).then((data) => {
        AppDispatcher.dispatch({
            type: UPDATE_BLOG,
            payload: data.data,
        });
    })
}

export const deleteBlog = function (id) {
    return deleteBlogAPI(id)
        .then((data) => {
            AppDispatcher.dispatch({
                type: DELETE_BLOG,
                payload: id,
            });
        })
}

export const getBlogsList = function (params) {
    return getBlogsListAPI(params).then((data) => {
        AppDispatcher.dispatch({
            type: GET_BLOGS_LIST,
            payload: data,
        });
    })
}

export const blogLikePost = function(data) {
    return blogLikeAPI(data)
    .then((res) => {
        AppDispatcher.dispatch({
            type: BLOG_LIKE,
            payload: {
                ...res,
                sourceID: data.id,
            },
        });
    })
}

export const blogClear = function(data) {
    AppDispatcher.dispatch({
        type: BLOG_CLEAR,
    });
}