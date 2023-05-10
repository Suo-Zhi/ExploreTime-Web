import { SortExplain } from './types';

export interface FindExplainDTO {
    keywords: string; // 搜索关键字
    sort: SortExplain;
}

export interface CreateExplainDTO {
    title: string;
    content: string;
}

export interface UpdateExplainDTO extends CreateExplainDTO {}
