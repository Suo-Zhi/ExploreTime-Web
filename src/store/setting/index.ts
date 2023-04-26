import { SettingState } from './types';

export default defineStore('setting', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get('isFoldMenu', false), // 是否折叠左侧菜单
        isSplitScreen: localCache.get('isSplitScreen', false), // 工作台是否分屏
        nextScreen: localCache.get('isSplitScreen', false) ? 'right' : 'left', // 工作台下一次激活的屏幕
        screen: {
            left: localCache.get('leftScreen', 'info'), // 工作台左屏需显示组件
            right: localCache.get('rightScreen', 'point'), // 工作台右屏需显示组件
        },
    }),
});
