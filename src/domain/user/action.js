import {
    USER_GET,
    LOG_IN,
    LOG_OUT,
    CHANGE_PASSWORD,
    REGISTRY,
    CHANGE_AVATAR,
    CHANGE_USER_BASEINFO,
} from '@common/constants/user';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    getUser as _getUser,
    login as _login,
    changePasswordAPI,
    registryAPI,
    changeAvatarAPI,
    changeBaseInfoAPI,
} from '@common/api/userAPI';
import { async } from 'q';

export const getUser = function(userID) {
    _getUser(userID)
        .then(function (data) {
            AppDispatcher.dispatch({
                type: USER_GET,
                payload: data.data,
            })
        })
}

export const login = function(data) {
    return _login(data)
    .then((data) => {
        AppDispatcher.dispatch({
            type: LOG_IN,
            payload: data,
        });
    })
}

export const logout = function(data) {
    AppDispatcher.dispatch({
        type: LOG_OUT,
    });
}

export const changePassword = function(data) {
    return changePasswordAPI(data)
    .then((p) => {
        AppDispatcher.dispatch({
            type: CHANGE_PASSWORD,
            payload: p.data,
        });
    })
}

export const registry = async function(data) {
    const p = await registryAPI(data)
    AppDispatcher.dispatch({
        type: REGISTRY,
        payload: p.data,
    });
}

export const changeAvatar = async function(data) {
    const p = await changeAvatarAPI(data)
    AppDispatcher.dispatch({
        type: CHANGE_AVATAR,
        payload: p.data,
    });
}

export const changeBaseInfo = function(data) {
    return changeBaseInfoAPI(data)
    .then((data) => {
        AppDispatcher.dispatch({
            type: CHANGE_USER_BASEINFO,
            payload: data.data,
        });
    })
}