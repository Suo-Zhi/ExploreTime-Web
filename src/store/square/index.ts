import { HistoryLink } from '../setting/types';
import { DiscussType, SquareState } from './types';

export default defineStore('square', {
    state: (): SquareState => ({
        isOpenInfoBox: false, // 是否分屏
        // 历史链接
        history: {
            activeIndex: -1,
            links: [],
        },
        // 讨论区
        discuss: {
            isShow: false,
            targetId: -1,
            targetType: 'point',
        },
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
                this.history.activeIndex = this.history.links.length - 1;
            }
            // 已存在则激活该链接
            else this.history.activeIndex = index;
        },

        // 移除历史链接
        removeHistoryLink(index: number) {
            // 移除指定项
            this.history.links.splice(index, 1);
            // 如果移除项等于激活项，则重置激活索引
            if (index === this.history.activeIndex) this.history.activeIndex = -1;
            // 如果移除项未激活 且 移除项位于激活项左侧: 则激活项左移1位
            else if (index < this.history.activeIndex)
                this.history.activeIndex = this.history.activeIndex - 1;
        },

        // 打开讨论区
        openDiscussArea(targetId: number, targetType: DiscussType) {
            this.discuss.targetId = targetId;
            this.discuss.targetType = targetType;
            this.discuss.isShow = true;
        },
    },
});
