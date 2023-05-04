import { FindTreeDTO } from './dto';
import { Tree } from './types';

export default {
    // 获取个人知识树列表(包含搜索 & 排序)
    findMy(dto: FindTreeDTO) {
        return http.get<Tree[]>('tree/my', {
            params: { ...dto },
        });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('tree/remove' + id);
    },

    // 公开
    togglePublic: (id: number, value: boolean) => {
        return http.patch('tree/public' + id, { value });
    },
};
