import { SettingState } from './types';

export default defineStore('global', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get('isFoldMenu', false), // 是否折叠左侧菜单
    }),
});
