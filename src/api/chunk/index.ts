import { FindChunkDTO } from './dto';
import { Chunk } from './types';

export default {
    findMy(dto: FindChunkDTO) {
        return http.get<Chunk[]>('chunk/my', {
            params: { ...dto },
        });
    },
};
