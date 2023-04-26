export interface SettingState {
    isFoldMenu: boolean;
    isSplitScreen: boolean;
    nextScreen: 'left' | 'right';
    screen: LRScreen;
}

interface LRScreen {
    left: Section;
    right: Section;
}

// 可显示组件类型
export type Section =
    | ''
    | 'info'
    | 'point'
    | 'chunk'
    | 'tree'
    | 'explain'
    | 'exercise'
    | 'exerciseSet';
