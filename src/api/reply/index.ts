import { ChildReply, Reply } from './types';

export default {
    // 获取根回复列表
    getRoot: (feedbackId: number) => {
        return http.get<Reply[]>('reply/root' + feedbackId);
    },

    // 获取子回复列表
    getChild: (rootId: number) => {
        return http.get<ChildReply[]>('reply/child' + rootId);
    },
};
