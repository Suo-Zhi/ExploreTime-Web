import { SortChunk } from './types';

export interface FindChunkDTO {
    keywords: string;
    sort: SortChunk;
}

export interface CreateChunkDTO {
    name: string;
}

export interface UpdateChunkDTO extends CreateChunkDTO {
    preface: string;
    endnote: string;
}
