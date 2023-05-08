import { SquareState } from './types';

export default defineStore('square', {
    state: (): SquareState => ({
        isOpenInfoBox: false, // 是否分屏
    }),
});
