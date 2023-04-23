import { UserInfo } from '@/store/user/types';
import { LoginDTO, RegisterDTO } from './types';

export default {
    // 注册
    register: (dto: RegisterDTO) => {
        return http.post('auth/register', {
            ...dto,
        });
    },

    // 登录
    login: (dto: LoginDTO) => {
        return http.post<{ token: string }>('auth/login', {
            ...dto,
        });
    },

    // 获取当前登录用户信息
    getCurrentUserInfo: () => {
        return http.get<UserInfo>('auth/current-user-info');
    },
};
