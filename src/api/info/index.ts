import { CreateInfoDTO, FindInfoDTO, Info } from './types';

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
};
