import { CreateReplyDTO } from './dto';
import { ChildReply, RootReply } from './types';

export default {
    // 获取根回复列表
    getRoot: (feedbackId: number) => {
        return http.get<RootReply[]>('reply/root' + feedbackId);
    },

    // 获取子回复列表
    getChild: (rootId: number) => {
        return http.get<ChildReply[]>('reply/child' + rootId);
    },

    // 新增回复
    create: (dto: CreateReplyDTO) => {
        return http.post('reply', { ...dto });
    },
};
