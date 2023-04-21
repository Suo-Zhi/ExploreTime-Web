import { SettingState } from './types';

export default defineStore('global', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get(CacheKey.IsFoldMenu, false), // 是否折叠左侧菜单
    }),
});
