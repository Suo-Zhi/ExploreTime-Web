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
        // 每次请求携带token
        config.headers.Accept = 'application/json';
        config.headers.Authorization = 'Bearer ' + localCache.get('token');
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

        const { prompt } = store.global();

        switch (status) {
            // 身份认证失败
            case HttpStatus.Unauthorized:
                prompt('身份认证过期,请重新登录哦', 'error');
                localCache.remove('token');
                useRouter().push({ name: 'login' });
                break;
            // 表单验证失败
            case HttpStatus.Unprocessable_Entity:
                Object.keys(message).forEach((key) => {
                    for (let i = 0; i < message[key].length; i++) {
                        prompt(message[key][i], 'error');
                    }
                });
                break;
            // 请求失败
            case HttpStatus.Bad_Request:
                prompt(message, 'error');
                break;
            // 请求地址错误
            case HttpStatus.Err_Bad_Request:
                prompt('请求地址不存在', 'error');
                break;
            // 其它错误
            default:
                prompt(message ?? '服务器出现问题，程序员正在努力抢救，请您稍后再试', 'error');
        }
        return Promise.reject(error);
    }
);
