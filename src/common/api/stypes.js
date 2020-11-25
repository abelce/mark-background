import http from '@common/utils/http';

export function saveTypeAPI(data) {
    return http({
        method: 'post',
        url: '/stypes',
        data,
    })
}

export function getTypesListAPI(params) {
    return http({
        method: 'get',
        url: '/stypes',
        params,
    })
}