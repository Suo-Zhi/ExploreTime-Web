import { SortExercise } from './types';

export interface FindExerciseDTO {
    keywords: string; // 搜索关键字
    sort: SortExercise;
}

export interface CreateExerciseDTO {
    question: string;
    detail: string;
    answer: string;
    analysis: string;
}

export interface UpdateExerciseDTO extends CreateExerciseDTO {}
