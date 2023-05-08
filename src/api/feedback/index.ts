import { CreateFeedbackDTO, FindFeedbackDTO } from './dto';
import { Feedback } from './types';

export default {
    // 获取 & 搜索反馈
    find: (dto: FindFeedbackDTO) => {
        return http.get<Feedback[]>('feedback', {
            params: { ...dto },
        });
    },

    // 新增反馈
    create: (dto: CreateFeedbackDTO) => {
        return http.post('feedback', { ...dto });
    },
};
