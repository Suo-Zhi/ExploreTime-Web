import { CreateLikeDTO } from './dto';

export default {
    // 点赞
    create: (dto: CreateLikeDTO) => {
        return http.post('like', {
            ...dto,
        });
    },

    // 取消点赞
    del: (id: number) => {
        return http.delete('like/' + id, {});
    },
};
