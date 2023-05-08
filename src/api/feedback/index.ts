import { FindFeedbackDTO } from './dto';
import { Feedback } from './types';

export default {
    // 获取反馈
    find: (dto: FindFeedbackDTO) => {
        return http.get<Feedback[]>('feedback', {
            params: { ...dto },
        });
    },
};
