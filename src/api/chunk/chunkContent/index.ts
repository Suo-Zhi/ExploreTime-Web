import { DeleteChunkContentDTO, UpsertChunkContentDTO } from './dto';

export default {
    // 更新
    upsert: (dto: UpsertChunkContentDTO) => {
        return http.post('chunk-content', { ...dto });
    },

    // 删除
    delete: (dto: DeleteChunkContentDTO) => {
        return http.delete('chunk-content', {
            params: { ...dto },
        });
    },
};
