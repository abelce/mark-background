
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    commentGetAPI,
    commentPostAPI,
    commentListAPI,
    commentDeleteAPI,
} from '@common/api/commentAPI.js';
import {
    GET_COMMENT_BY_ID,
    GET_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_CHILDREN_COMMENTS,
} from '@common/constants/comment.js';

export const getCommentList = function (params) {
    return commentListAPI(params)
        .then((data) => {
            AppDispatcher.dispatch({
                type: GET_COMMENTS,
                payload: data,
            });
        })
}

export const getChildrenList = function (params) {
    return commentListAPI(params)
        .then((data) => {
            AppDispatcher.dispatch({
                type: GET_CHILDREN_COMMENTS,
                payload: data,
            });
        })
}

export const getCommentByID = function (params) {
    return commentGetAPI(params)
        .then((data) => {
            AppDispatcher.dispatch({
                type: GET_COMMENT_BY_ID,
                payload: data.data,
            });
        })
}

export const createComment = function (params) {
    return commentPostAPI(params)
        .then((data) => {
            data.data.attributes = {
                ...params,
                ...data.data.attributes
            }
            AppDispatcher.dispatch({
                type: CREATE_COMMENT,
                payload: data.data,
            });
        })
}

export const deleteComment = function (data) {
    return commentDeleteAPI(data)
        .then((data) => {
            AppDispatcher.dispatch({
                type: DELETE_COMMENT,
                payload: data.data,
            });
        })
}