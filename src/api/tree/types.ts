import { SortField, SortOrder } from '@/store/setting/types';

export interface Tree {
    id: number; // 知识树Id
    name: string; // 知识树名
    preface: string; // 知识树前言
    isPublic: boolean; // 是否公开

    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间

    chunkTotal: number; // 包含知识块数
    pointTotal: number; // 包括知识点数
}

export interface SortTree {
    field: SortField;
    order: SortOrder;
}
