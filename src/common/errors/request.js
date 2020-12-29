// /**
//  * 这里处理http请求错误， 比如字段传递错误，或者是token过期，网络错误，并且可以给出用户提示的错误，
//  */
// import {notification} from 'antd';
// import LocalStorage from 'store';
//
// const errMap = {
//     0: {
//         'timeout of 10000ms exceeded': function() {
//             notification.error({
//                 message: '错误提示',
//                 description: '请求超时'
//             });
//         }
//     },
//     400: {
//         'session is expired': function () {
//             if (location.pathname !== '/login') {
//                 LocalStorage.remove('user');
//                 window.location.href = "/login";
//             }
//         },
//         'old password is incorrect': function() {
//             notification.error({
//                 message: '错误提示',
//                 description: '旧密码错误'
//             });
//         },
//         'name has existed': function () {
//             notification.error({
//                 message: '错误提示',
//                 description: '用户名已经存在'
//             });
//         },
//         'Wrong password': function () {
//             notification.error({
//                 message: '错误提示',
//                 description: '用户名或密码错误'
//             });
//         },
//     },
//     401: {
//         'UNAUTHORIZED': function () {
//             window.location.href = "/login";
//             // notification.warn({
//             //     message: '错误提示',
//             //     description: '请登录后重试'
//             // });
//         },
//         'NOSESSIONTOKEN': function() {
//             notification.warn({
//                 message: '错误提示',
//                 description: '请登录后重试'
//             });
//         }
//     },
//     500: {
//         'email already exist': function () {
//             notification.error({
//                 message: '错误提示',
//                 description: '邮箱已经存在'
//             });
//         },
//     }
//
//
// }
//
// export default function handleError(err) {
//     console.log(err);
//     if (err.response === undefined && err.code === "ECONNABORTED") {
//         const item = errMap[0];
//         if (item) {
//             const fn = item[err.message];
//             if (typeof fn === 'function') {
//                 fn();
//             }
//         }
//         return;
//     }
//     const {
//         response: {
//             status,
//             data: {
//                 errors
//             }
//         }
//     } = err;
//     const item = errMap[status];
//     if (item) {
//         const fn = item[errors[0]['detail']];
//         if (typeof fn === 'function') {
//             fn();
//         }
//     }
// }