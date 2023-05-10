import { SortField, SortOrder } from '@/store/setting/types';

export interface Explain {
    id: number; // 讲解Id
    title: string; // 讲解标题
    content: string; // 讲解内容
    isPublic: boolean; // 是否已公开
    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface SortExplain {
    field: SortField;
    order: SortOrder;
}
