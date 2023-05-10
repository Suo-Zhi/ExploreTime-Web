import { SortField, SortOrder } from '@/store/setting/types';
import { Exercise } from '../types';

export interface ExerciseSet {
    id: number; // 习题集Id
    name: string; // 习题集名
    preface: string; // 习题集前言
    content: ExerciseSetContent[]; // 习题集内容
    isPublic: boolean; // 是否公开

    isDel: boolean; // 是否已删除
    authorId: string; // 作者Id
    createTime: Date; // 创建时间
    updateTime: Date; // 更新时间
}

export interface ExerciseSetContent extends Exercise {
    order: number; // 习题在块内的顺序
    isMatch: boolean; // 习题是否含有搜索关键字
}

export interface SortExerciseSet {
    field: SortField;
    order: SortOrder;
}
