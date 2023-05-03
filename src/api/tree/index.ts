import { FindTreeDTO } from './dto';
import { TreeItem } from './types';

export default {
    // 获取个人知识树列表(包含搜索 & 排序)
    findMy(dto: FindTreeDTO) {
        return http.get<TreeItem[]>('tree/my', {
            params: { ...dto },
        });
    },
};
