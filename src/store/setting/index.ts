import { SettingState } from './types';

export default defineStore('setting', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get('isFoldMenu', false), // 是否折叠左侧菜单
        isSplitScreen: localCache.get('isSplitScreen', false), // 工作台是否分屏
        nextScreen: localCache.get('isSplitScreen', false) ? 'right' : 'left', // 工作台下一次激活的屏幕
        screen: {
            left: localCache.get('screen')?.left || 'info', // 工作台左屏需显示组件
            right: localCache.get('screen')?.right || '', // 工作台右屏需显示组件
        },
        // 排序设置
        sort: {
            field: {
                info: localCache.get('sort')?.field?.info || 'updateTime',
                point: localCache.get('sort')?.field?.point || 'updateTime',
                chunk: localCache.get('sort')?.field?.chunk || 'updateTime',
                tree: localCache.get('sort')?.field?.tree || 'updateTime',
                explain: localCache.get('sort')?.field?.explain || 'updateTime',
                exercise: localCache.get('sort')?.field?.exercise || 'updateTime',
                exerciseSet: localCache.get('sort')?.field?.exerciseSet || 'updateTime',
            },
            order: {
                info: localCache.get('sort')?.order?.info || 'desc',
                point: localCache.get('sort')?.order?.point || 'desc',
                chunk: localCache.get('sort')?.order?.chunk || 'desc',
                tree: localCache.get('sort')?.order?.tree || 'desc',
                explain: localCache.get('sort')?.order?.explain || 'desc',
                exercise: localCache.get('sort')?.order?.exercise || 'desc',
                exerciseSet: localCache.get('sort')?.order?.exerciseSet || 'desc',
            },
        },
    }),
});
