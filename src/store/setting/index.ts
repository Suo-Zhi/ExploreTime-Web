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
            info: {
                field: localCache.get('sort')?.info?.field || 'updateTime',
                order: localCache.get('sort')?.info?.order || 'desc',
            },
            point: {
                field: localCache.get('sort')?.point?.field || 'updateTime',
                order: localCache.get('sort')?.point?.order || 'desc',
            },
            chunk: {
                field: localCache.get('sort')?.chunk?.field || 'updateTime',
                order: localCache.get('sort')?.chunk?.order || 'desc',
            },
            tree: {
                field: localCache.get('sort')?.tree?.field || 'updateTime',
                order: localCache.get('sort')?.tree?.order || 'desc',
            },
            explain: {
                field: localCache.get('sort')?.explain?.field || 'updateTime',
                order: localCache.get('sort')?.explain?.order || 'desc',
            },
            exercise: {
                field: localCache.get('sort')?.exercise?.field || 'updateTime',
                order: localCache.get('sort')?.exercise?.order || 'desc',
            },
            exerciseSet: {
                field: localCache.get('sort')?.exerciseSet?.field || 'updateTime',
                order: localCache.get('sort')?.exerciseSet?.order || 'desc',
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
                // 历史链接数超过上限则移除首项
                const lenght = this.history.links.length;
                if (lenght > 5) this.removeHistoryLink(0);
                // 激活新增链接
                this.history.activeIndex[this.nextScreen] = this.history.links.length - 1;
            }
            // 已存在则激活该链接
            else this.history.activeIndex[this.nextScreen] = index;
        },

        // 移除历史链接
        removeHistoryLink(index: number) {
            // 移除指定项
            this.history.links.splice(index, 1);

            // 如果移除项处于激活状态: 则清空移除项所在屏幕
            if (index === this.history.activeIndex.left) {
                this.history.activeIndex.left = -1;
                this.screen.left = '';
            }
            if (index === this.history.activeIndex.right) {
                this.history.activeIndex.right = -1;
                this.screen.right = '';
            }

            // 如果移除项未激活 且 移除项位于激活项前: 则激活项前移
            if (index < this.history.activeIndex.left && this.history.activeIndex.left !== -1)
                this.history.activeIndex.left = this.history.activeIndex.left - 1;
            if (index < this.history.activeIndex.right && this.history.activeIndex.right !== -1)
                this.history.activeIndex.right = this.history.activeIndex.right - 1;
        },
    },
});
