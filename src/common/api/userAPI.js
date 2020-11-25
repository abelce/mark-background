import http from '@common/utils/http';

export function getUser() {
    return http({
        url: `/operators`,
        method: 'get',
    });
}

export function login(data) {
    return http({
        method: 'post',
        url: '/auth',
        data: data,
    })
}

export function changePasswordAPI(data) {
    return http({
        method: 'post',
        url:'/operators/changePassword',
        data: data,
    })
}

export function registryAPI(data) {
    return http({
        method: 'post',
        url: '/registry',
        data,
    })
}

export function changeAvatarAPI(data) {
    return http({
        method: 'put',
        url:'/operators/avatar',
        data: data,
    })
}

export function changeBaseInfoAPI(data) {
    return http({
        method: 'put',
        url: '/operators',
        data,
    })
}