import http from '@common/utils/http';

export function getBlogAPI (id, params) {
    return http({
        method: 'get',
        url: '/articles/' + id,
        params: params,
    });
}

export function getBlogsAPI(params) {
    return http({
        method: 'get',
        url: '/articles',
        params,
    })
}

export function saveBlogAPI(data) {
    return http({
        method: 'post',
        url: '/articles',
        data,
    })
}

export function updateBlogAPI(data) {
    return http({
        method: 'put',
        url: '/articles/' + data.id,
        data,
    })
}

export function deleteBlogAPI(id) {
    return http({
        method: 'delete',
        url: '/articles/' + id,
    })
}

export function getBlogsListAPI(params) {
    return http({
        method: 'get',
        url: '/articles/list',
        params,
    })
}

export function blogLikeAPI(data) {
    return http({
        method: 'post',
        url: '/articles/like',
        data,
    })
}