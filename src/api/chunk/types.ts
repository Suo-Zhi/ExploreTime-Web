import { SortField, SortOrder } from '@/store/setting/types';
import { Point } from '../point/types';

export interface Chunk {
    id: number; // 知识块Id
    name: string; // 知识块名
    preface: string; // 知识块前言
    content: ChunkContent[]; // 知识块内容
    endnote: string; // 知识块尾注
    isRefine: boolean; // 是否已处理

    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface ChunkContent extends Point {
    order: number; // 知识点在块内的顺序
    isMatch: boolean; // 知识点是否含有搜索关键字
}

export interface SortChunk {
    field: SortField;
    order: SortOrder;
}
