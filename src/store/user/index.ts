import { UserInfo, UserState } from './types';

export default defineStore('user', {
    state: (): UserState => ({
        userinfo: {} as UserInfo,
    }),
});
