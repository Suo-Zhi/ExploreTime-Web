import { Point } from '../point/types';
import { FindRelateDTO } from './dto';

export default {
    // 获取关联项
    findRelate: (dto: FindRelateDTO) => {
        return http.get<Point[]>('relate', {
            params: {
                ...dto,
            },
        });
    },
};
