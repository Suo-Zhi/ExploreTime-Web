import { CreateLikeDTO } from './dto';

export default {
    create: (dto: CreateLikeDTO) => {
        return http.post('like', {
            ...dto,
        });
    },
};
