import http from '@common/utils/http';

export function getLikeCountAPI (id) {
    return http({
        method: 'get',
        url: '/likecount/' + id,
    });
}

export function checkLikeAPI (id) {
    return http({
        method: 'get',
        url: '/like/check/' + id,
    });
}

export function likeAPI (data) {
    return http({
        method: 'post',
        url: '/like',
        data
    });
}