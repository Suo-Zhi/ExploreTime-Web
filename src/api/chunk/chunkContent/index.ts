import { UpdateChunkContentDTO } from './dto';

export default {
    // 更新
    update: (dto: UpdateChunkContentDTO) => {
        return http.post('chunk-content', { ...dto });
    },
};
