export interface SettingState {
    isFoldMenu: boolean;
    isSplitScreen: boolean;
    nextScreen: 'left' | 'right';
    screen: LRScreen;
    sort: {
        field: Record<Section, SortField>;
        order: Record<Section, SortOrder>;
    };
}

interface LRScreen {
    left: Section | LinkBox | '';
    right: Section | LinkBox | '';
}

export type Section = 'info' | 'point' | 'chunk' | 'tree' | 'explain' | 'exercise' | 'exerciseSet'; // 屏幕可显示组件类型
export type LinkBox = 'relateDetail'; // 历史链接可显示的组件类型

export type SortField = 'createTime' | 'updateTime'; // 排序字段名
export type SortOrder = 'asc' | 'desc'; // 排序规则
