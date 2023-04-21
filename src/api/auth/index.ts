import { UserInfo } from './types';

export default {
    // 获取当前登录用户信息
    getCurrentUserInfo: () => {
        return http.get<UserInfo>('auth/current-user-info');
    },
};
