import { TreeDetail } from './types';

export default {
    // 获取树详情
    getTreeDetail: (id: number) => {
        return http.get<TreeDetail>('tree-node/' + id);
    },
};
