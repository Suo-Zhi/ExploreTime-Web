import { Point } from '../point/types';
import { CreateRelateDTO, DelRelateDTO, FindRelateDTO } from './dto';

export default {
    // 获取关联项
    findPointRelate: (dto: FindRelateDTO) => {
        return http.get<Point[]>('relate', {
            params: {
                ...dto,
            },
        });
    },

    // 取消关联
    delRelate: (dto: DelRelateDTO) => {
        return http.delete('relate', {
            params: { ...dto },
        });
    },

    // 新增关联
    createRelate: (dto: CreateRelateDTO) => {
        return http.post('relate', { ...dto });
    },
};
