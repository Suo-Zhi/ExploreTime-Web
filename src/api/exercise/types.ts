import { SortField, SortOrder } from '@/store/setting/types';

export interface Exercise {
    id: number; // 习题Id
    question: string; // 习题问题
    detail: string; // 问题描述
    answer: string; // 参考回答
    analysis: string; // 习题解析
    isRefine: boolean; // 是否已处理
    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface SortExercise {
    field: SortField;
    order: SortOrder;
}
