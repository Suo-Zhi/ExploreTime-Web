import { SortField, SortOrder } from '@/store/setting/types';

export interface Info {
    id: number; // 有效信息Id
    content: string; // 有效信息内容
    isRefine: boolean; // 是否提炼为知识点
    isDel: boolean; // 是否删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface FindInfoDTO {
    keywords: string; // 搜索关键字
    sort: SortInfo;
}

export interface CreateInfoDTO {
    content: string;
}

export interface SortInfo {
    field: SortField;
    order: SortOrder;
}
