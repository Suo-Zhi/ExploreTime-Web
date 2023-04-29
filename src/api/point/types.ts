import { SortField, SortOrder } from '@/store/setting/types';

export interface Point {
    id: number; // 知识点Id
    name: string; // 知识点名
    content: string; // 知识点内容
    isRefine: boolean; // 是否已处理
    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface SortPoint {
    field: SortField;
    order: SortOrder;
}
