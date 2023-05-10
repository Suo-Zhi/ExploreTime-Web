import { SortExerciseSet } from './types';

export interface FindExerciseSetDTO {
    keywords: string;
    sort: SortExerciseSet;
}

export interface CreateExerciseSetDTO {
    name: string;
    preface: string;
}

export interface UpdateExerciseSetDTO extends CreateExerciseSetDTO {}
