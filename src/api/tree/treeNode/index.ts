import { TreeDetail } from './types';

export default {
    getTreeDetail: (id: number) => {
        return http.get<TreeDetail>('tree-node/' + id);
    },
};
