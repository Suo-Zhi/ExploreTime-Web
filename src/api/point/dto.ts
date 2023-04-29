import { SortPoint } from './types';

export interface FindPointDTO {
    keywords: string; // 搜索关键字
    sort: SortPoint;
}

export interface CreatePointDTO {
    name: string;
    content: string;
}

export interface UpdatePointDTO extends CreatePointDTO {}
