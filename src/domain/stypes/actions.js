import AppDispatcher from '@common/utils/AppDispatcher';
import {
    SAVE_TYPE,
    GET_TYPES,
} from '@common/constants/stypes.js';
import {
    saveTypeAPI,
    getTypesListAPI
} from '@common/api/stypes.js';

export const getTypesList = function (params) {
    return getTypesListAPI(params).then((data) => {
        AppDispatcher.dispatch({
            type: GET_TYPES,
            payload: data,
        });
    })
}

export const saveType = function (data) {
    return saveTypeAPI(data)
        .then((data) => {
            AppDispatcher.dispatch({
                type: SAVE_TYPE,
                payload: data.data,
            });
        })
}