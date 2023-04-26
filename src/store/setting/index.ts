import { SettingState } from './types';

export default defineStore('global', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get('isFoldMenu', false), // 是否折叠左侧菜单
        isSplitScreen: localCache.get('isSplitScreen', false), // 工作台是否分屏
        nextScreen: localCache.get('isSplitScreen', false) ? 'right' : 'left', // 工作台下一次激活的屏幕
    }),
});
