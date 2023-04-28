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
};
