import { HistoryLink } from '../setting/types';

export interface SquareState {
    isOpenInfoBox: boolean;
    history: {
        activeIndex: number;
        links: HistoryLink[];
    };
    discuss: {
        isShow: boolean;
        targetId: number;
        targetType: DiscussType;
    };
}

export type DiscussType = 'point' | 'chunk' | 'tree' | 'explain' | 'exercise' | 'exerciseSet';
