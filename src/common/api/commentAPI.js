import http from '@common/utils/http';

export function commentGetAPI(params) {
    return http({
        method: 'get',
        url: '/comment',
        params
    })
}

export function commentPostAPI(data) {
    return http({
        method: 'post',
        url: '/comment',
        data
    })
}

export function commentListAPI(params) {
    return http({
        method: 'get',
        url: '/comment/list',
        params
    })
}

export function commentDeleteAPI(params) {
    return http({
        method: 'delete',
        url: '/comment',
        params
    })
}