import { FindPointDTO } from './dto';
import { Point } from './types';

export default {
    // 获取个人知识点列表(包含搜索 & 排序)
    findMy: (dto: FindPointDTO) => {
        return http.get<Point[]>('point/my', {
            params: {
                ...dto,
            },
        });
    },
};
