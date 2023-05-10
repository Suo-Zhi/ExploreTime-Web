import { CreateExerciseDTO, FindExerciseDTO, UpdateExerciseDTO } from './dto';
import { Exercise } from './types';

export default {
    // 获取个人习题列表(包含搜索 & 排序)
    findMy: (dto: FindExerciseDTO) => {
        return http.get<Exercise[]>('exercise/my', {
            params: { ...dto },
        });
    },

    // 获取公开习题列表
    findPublic(keywords: string) {
        return http.get<Exercise[]>('exercise/public', {
            params: { keywords },
        });
    },

    // 移除
    remove: (id: number) => {
        return http.patch('exercise/remove' + id);
    },

    // 归档
    toggleRefine: (id: number, value: boolean) => {
        return http.patch('exercise/refine' + id, { value });
    },

    // 更新
    update: (id: number, dto: UpdateExerciseDTO) => {
        return http.patch('exercise/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreateExerciseDTO) => {
        return http.post<Exercise>('exercise', { ...dto });
    },
};
