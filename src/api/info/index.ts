import { CreateInfoDTO, UpdateInfoDTO } from './dto';
import { FindInfoDTO, Info } from './types';

export default {
    // 获取个人有效信息列表(包含搜索 & 排序)
    findMy: (dto: FindInfoDTO) => {
        return http.get<Info[]>('info/my', {
            params: {
                ...dto,
            },
        });
    },

    // 增
    create: (dto: CreateInfoDTO) => {
        return http.post('info', { ...dto });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('info/remove' + id);
    },

    // 删除
    delete: (id: number) => {
        return http.delete('info/' + id);
    },

    // 归档
    toggleRefine: (id: number, value: boolean) => {
        return http.patch('info/refine' + id, { value });
    },

    // 更新内容
    updateContent: (id: number, dto: UpdateInfoDTO) => {
        return http.patch('info/content' + id, { ...dto });
    },
};
