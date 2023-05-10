export interface SettingState {
    isFoldMenu: boolean;
    isSplitScreen: boolean;
    nextScreen: 'left' | 'right';
    screen: LRScreen;
    sort: Record<
        Section,
        {
            field: SortField;
            order: SortOrder;
        }
    >;
    history: {
        activeIndex: {
            left: number;
            right: number;
        };
        links: HistoryLink[];
    };
}

interface LRScreen {
    left: Section | LinkBox | '';
    right: Section | LinkBox | '';
}

export interface HistoryLink {
    linkType: LinkBox; // 链接类型
    linkTitle: string; // 链接标题
    targetId: number; // 目标Id
    targetType: Section | ''; // 目标类型
}

export type Section = 'info' | 'point' | 'chunk' | 'tree' | 'explain' | 'exercise' | 'exerciseSet'; // 屏幕可显示组件类型
export type LinkBox = 'relateDetail' | 'treeDetail' | 'explainDetail'; // 历史链接可显示的组件类型

export type SortField = 'createTime' | 'updateTime'; // 排序字段名
export type SortOrder = 'asc' | 'desc'; // 排序规则
