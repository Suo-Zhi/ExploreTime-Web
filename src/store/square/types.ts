import { HistoryLink } from '../setting/types';

export interface SquareState {
    isOpenInfoBox: boolean;
    history: {
        activeIndex: number;
        links: HistoryLink[];
    };
}
