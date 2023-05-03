import { Chunk } from '../chunk/types';
import { Point } from '../point/types';
import { CreateRelateDTO, DelRelateDTO, FindRelateDTO } from './dto';

export default {
    // 获取点关联项
    findPointRelate: (dto: FindRelateDTO) => {
        return http.get<Point[]>('relate/point', {
            params: { ...dto, relateType: 'point' },
        });
    },

    // 获取块关联项
    findChunkRelate: (dto: FindRelateDTO) => {
        return http.get<Chunk[]>('relate/chunk', {
            params: { ...dto, relateType: 'chunk' },
        });
    },

    // 取消关联
    delRelate: (dto: DelRelateDTO) => {
        return http.delete('relate', {
            params: { ...dto },
        });
    },

    // 新增关联
    createRelate: (dto: CreateRelateDTO) => {
        return http.post('relate', { ...dto });
    },
};
