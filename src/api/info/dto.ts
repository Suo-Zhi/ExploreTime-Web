import { SortInfo } from './types';

export interface FindInfoDTO {
    keywords: string; // 搜索关键字
    sort: SortInfo;
}

export interface CreateInfoDTO {
    content: string;
}

export interface UpdateInfoDTO extends CreateInfoDTO {}
