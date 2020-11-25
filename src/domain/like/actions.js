import AppDispatcher from '@common/utils/AppDispatcher';
import {
    LIKE_POST,
    LIKE_CHECK,
    LIKE_COUNT_GET
} from '@common/constants/like.js';
import {
    getLikeCountAPI,
    checkLikeAPI,
    likeAPI,
} from '@common/api/likeAPI.js';

export const likePost = function(sourceID) {
    return likeAPI({sourceID})
    .then((data) => {
        AppDispatcher.dispatch({
            type: LIKE_POST,
            payload: {
                ...data,
                sourceID,
            },
        });
    })
}

export const likeCheck = function(sourceID) {
    return checkLikeAPI(sourceID)
    .then((data) => {
        AppDispatcher.dispatch({
            type: LIKE_CHECK,
            payload: {
                sourceID,
                like: data.like
            },
        });
    })
}

export const likeCountGet = function(sourceID) {
    return getLikeCountAPI(sourceID)
    .then((data) => {
        AppDispatcher.dispatch({
            type: LIKE_COUNT_GET,
            payload: data,
        });
    })
}