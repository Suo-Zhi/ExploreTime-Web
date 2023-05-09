import { Reply } from './types';

export default {
    // 获取根回复列表
    getRoot: (feedbackId: number) => {
        return http.get<Reply[]>('reply/root' + feedbackId);
    },
};
