import { UpsertTreeNodeDTO } from './dto';
import { TreeDetail } from './types';

export default {
    // 获取树详情
    getTreeDetail: (id: number) => {
        return http.get<TreeDetail>('tree-node/' + id);
    },

    // 更新
    upsert: (id: number, dto: UpsertTreeNodeDTO) => {
        return http.patch('tree-node/' + id, { ...dto });
    },

    // 删除
    delete: (id: number) => {
        return http.delete('tree-node/' + id);
    },
};
