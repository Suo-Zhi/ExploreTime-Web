import { UpsertChunkContentDTO } from './dto';

export default {
    // 更新
    upsert: (dto: UpsertChunkContentDTO) => {
        return http.post('chunk-content', { ...dto });
    },
};
