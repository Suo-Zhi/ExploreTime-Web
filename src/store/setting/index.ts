import { HistoryLink, SettingState } from './types';

export default defineStore('setting', {
    state: (): SettingState => ({
        isFoldMenu: localCache.get('isFoldMenu', false), // 是否折叠左侧菜单
        isSplitScreen: localCache.get('isSplitScreen', false), // 工作台是否分屏
        nextScreen: localCache.get('isSplitScreen', false) ? 'right' : 'left', // 工作台下一次激活的屏幕
        screen: {
            left: localCache.get('screen')?.left || (localCache.get('screen')?.right ? '' : 'info'), // 工作台左屏需显示组件(两屏均空则默认显示info)
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
        // 工作台历史链接
        history: localCache.get('history', {
            activeIndex: {
                left: -1,
                right: -1,
            },
            links: [],
        }),
    }),
    actions: {
        // 新增历史链接
        addHistoryLink(newLink: HistoryLink) {
            // 是否存在相同链接
            const index = this.history.links.findIndex(
                (link) => JSON.stringify(newLink) === JSON.stringify(link)
            );

            // 不存在在相同链接
            if (index === -1) {
                // 新增链接
                this.history.links.push(newLink);
                // 历史链接数是否超过上限
                const lenght = this.history.links.length;
                if (lenght > 6) this.history.links.shift(); // 移除首个链接
                // 激活新增链接
                else this.history.activeIndex[this.nextScreen] = this.history.links.length - 1;
            }
            // 已存在则激活该链接
            else this.history.activeIndex[this.nextScreen] = index;
        },
    },
});
