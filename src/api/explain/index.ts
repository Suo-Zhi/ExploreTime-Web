import { CreateExplainDTO, FindExplainDTO, UpdateExplainDTO } from './dto';
import { Explain } from './types';

export default {
    // 获取个人讲解列表(包含搜索 & 排序)
    findMy: (dto: FindExplainDTO) => {
        return http.get<Explain[]>('explain/my', {
            params: { ...dto },
        });
    },

    // 获取公开讲解列表
    findPublic(keywords: string) {
        return http.get<Explain[]>('explain/public', {
            params: { keywords },
        });
    },

    // 获取讲解详情
    getDetail: (id: number) => {
        return http.get<Explain>('explain/detail' + id);
    },

    // 移除
    remove: (id: number) => {
        return http.patch('explain/remove' + id);
    },

    // 公开
    togglePublic: (id: number, value: boolean) => {
        return http.patch('explain/public' + id, { value });
    },

    // 更新
    update: (id: number, dto: UpdateExplainDTO) => {
        return http.patch('explain/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreateExplainDTO) => {
        return http.post<Explain>('explain', { ...dto });
    },
};
