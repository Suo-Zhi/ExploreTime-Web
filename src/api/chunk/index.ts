import { CreateChunkDTO, FindChunkDTO, UpdateChunkDTO } from './dto';
import { Chunk } from './types';

export default {
    // 获取个人知识块列表(包含搜索 & 排序)
    findMy(dto: FindChunkDTO) {
        return http.get<Chunk[]>('chunk/my', {
            params: { ...dto },
        });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('chunk/remove' + id);
    },

    // 归档
    toggleRefine: (id: number, value: boolean) => {
        return http.patch('chunk/refine' + id, { value });
    },

    // 更新知识块
    update: (id: number, dto: UpdateChunkDTO) => {
        return http.patch('chunk/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreateChunkDTO) => {
        return http.post('chunk', { ...dto });
    },

    // 更新知识块更新时间
    updateTime: (id: number) => {
        return http.patch('chunk/time' + id);
    },
};
