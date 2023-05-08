import { CreateTreeDTO, FindTreeDTO, UpdateTreeDTO } from './dto';
import { Tree } from './types';

export default {
    // 获取个人知识树列表(包含搜索 & 排序)
    findMy(dto: FindTreeDTO) {
        return http.get<Tree[]>('tree/my', {
            params: { ...dto },
        });
    },

    // 获取公开知识树列表
    findPublic(keywords: string) {
        return http.get<Tree[]>('tree/public', {
            params: { keywords },
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

    // 更新
    update: (id: number, dto: UpdateTreeDTO) => {
        return http.patch('tree/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreateTreeDTO) => {
        return http.post<Tree>('tree', { ...dto });
    },

    // 更新时间
    updateTime: (id: number) => {
        return http.patch('tree/time' + id);
    },
};
