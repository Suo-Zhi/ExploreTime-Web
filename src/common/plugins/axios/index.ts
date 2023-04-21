import { env } from '@/common/utils/env';
import { HttpStatus } from '@/types/httpStatus';
import axios from 'axios';

// 接口根路径
const apiURL =
    env.VITE_ENV === 'production'
        ? '/api' // 生产环境请求路径
        : 'http://localhost:3000/api'; // 开发环境请求路径

export const http = axios.create({
    baseURL: apiURL,
    timeout: 10000,
});

/* 请求拦截 */
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

/* 响应拦截 */
http.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const {
            response: {
                status,
                data: { message },
            },
        } = error;

        switch (status) {
            // 请求失败
            case HttpStatus.Bad_Request:
                alert(message);
                break;
            // 请求地址错误
            case HttpStatus.Err_Bad_Request:
                alert(message);
                break;
            // 其它错误
            default:
                alert(message ?? '服务器出现问题，程序员正在努力抢救，请您稍后再试');
        }
        return Promise.reject(error);
    }
);
