import { CreateReplyDTO } from './dto';
import { ChildReply, RootReply } from './types';

export default {
    // 获取根回复列表
    getRoot: (feedbackId: number) => {
        return http.get<RootReply[]>('reply/root' + feedbackId, {
            params: {
                userId: store.user().userinfo?.id,
            },
        });
    },

    // 获取子回复列表
    getChild: (rootId: number) => {
        return http.get<ChildReply[]>('reply/child' + rootId, {
            params: {
                userId: store.user().userinfo?.id,
            },
        });
    },

    // 新增回复
    create: (dto: CreateReplyDTO) => {
        return http.post('reply', { ...dto });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('reply/remove' + id);
    },

    // 删除
    delete: (id: number) => {
        return http.delete('reply/' + id);
    },
};
