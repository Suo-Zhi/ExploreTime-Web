import { Learner } from './types';

export default {
    // 查找指定学习者
    findOne: (id: string) => {
        return http.get<Learner>('learner/' + id);
    },
};
