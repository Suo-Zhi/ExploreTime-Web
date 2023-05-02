import { SortChunk } from './types';

export interface FindChunkDTO {
    keywords: string;
    sort: SortChunk;
}

export interface CreateChunkDTO {
    name: string;
    preface: string;
    endnote: string;
}

export interface UpdateChunkDTO extends CreateChunkDTO {}
