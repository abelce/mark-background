import axios from 'axios';
import errors from '@common/errors/index.js';
import {getToken} from '@utils';

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3010/v1' : 'https://api.vwood.xyz/v1';
export const cdnURL = process.env.NODE_ENV === 'development' ? 'http://testing-cdn.vwood.xyz' : 'http://cdn.vwood.xyz';

export function httpBase(url) {
    return axios.create({
        baseURL: url || baseURL,
        timeout: 60000,
        headers: {
            'content-type': 'application/json',
            'token': getToken(),
            'Access-Control-Allow-Origin': '*',
        }
    })
}

function http (data) {
    const instance = httpBase();
    
    instance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        errors.handleError(error);
        return Promise.reject(error);
    });

    return instance(data);
}

export function localHttp(data) {
    const instance = httpBase("http://127.0.0.1:3604/v1");
    
    instance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        errors.handleError(error);
        return Promise.reject(error);
    });

    return instance(data);
}

export default http;