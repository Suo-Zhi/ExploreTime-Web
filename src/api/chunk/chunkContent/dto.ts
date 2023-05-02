export interface UpsertChunkContentDTO {
    chunkId: number;
    order: number;
    pointId: number;
}

export interface DeleteChunkContentDTO {
    chunkId: number;
    order: number;
}
