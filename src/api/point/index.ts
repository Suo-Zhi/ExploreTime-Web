import { CreatePointDTO, FindPointDTO, UpdatePointDTO } from './dto';
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

    // 移除
    remove: (id: number) => {
        return http.patch('point/remove' + id);
    },

    // 归档
    toggleRefine: (id: number, value: boolean) => {
        return http.patch('point/refine' + id, { value });
    },

    // 更新
    update: (id: number, dto: UpdatePointDTO) => {
        return http.patch('point/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreatePointDTO) => {
        return http.post<Point>('point', { ...dto });
    },
};
