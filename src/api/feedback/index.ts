import { CreateFeedbackDTO, FindFeedbackDTO } from './dto';
import { Feedback } from './types';

export default {
    // 获取 & 搜索反馈
    find: (dto: FindFeedbackDTO) => {
        return http.get<Feedback[]>('feedback', {
            params: {
                ...dto,
                userId: store.user().userinfo?.id,
            },
        });
    },

    // 新增反馈
    create: (dto: CreateFeedbackDTO) => {
        return http.post<Feedback>('feedback', { ...dto });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('feedback/remove' + id);
    },

    // 删除
    delete: (id: number) => {
        return http.delete('feedback/' + id);
    },
};
