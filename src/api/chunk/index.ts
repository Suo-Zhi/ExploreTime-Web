import { FindChunkDTO } from './dto';
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
};
