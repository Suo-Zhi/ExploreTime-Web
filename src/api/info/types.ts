export interface Info {
    id: number; // 有效信息Id
    content: string; // 有效信息内容
    isRefine: boolean; // 是否提炼为知识点
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
    field: SortFieldInfo;
    order: SortOrder;
}

export type SortFieldInfo = 'createTime' | 'updateTime'; // 排序字段名
export type SortOrder = 'asc' | 'desc'; // 排序规则
