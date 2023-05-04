import { SortTree } from './types';

export interface FindTreeDTO {
    keywords: string;
    sort: SortTree;
}

export interface CreateTreeDTO {
    name: string;
    preface: string;
}

export interface UpdateTreeDTO extends CreateTreeDTO {}
