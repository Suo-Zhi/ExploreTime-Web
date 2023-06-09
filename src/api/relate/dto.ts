import { OutputType } from './types';

export interface FindRelateDTO {
    targetId: number; // 源目标Id
    targetType: OutputType; // 源目标类型
    keywords: string; // 搜索关键字
}

export interface CreateRelateDTO {
    targetId: number; // 源目标Id
    targetType: OutputType; // 源目标类型
    relateId: number; // 关联项Id
    relateType: OutputType; // 关联项类型
}

export interface DelRelateDTO extends CreateRelateDTO {}
