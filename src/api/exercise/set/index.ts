import { CreateExerciseSetDTO, FindExerciseSetDTO, UpdateExerciseSetDTO } from './dto';
import { ExerciseSet } from './types';

export default {
    // 获取个人习题集列表(包含搜索 & 排序)
    findMy(dto: FindExerciseSetDTO) {
        return http.get<ExerciseSet[]>('exercise-set/my', {
            params: { ...dto },
        });
    },

    // 获取习题集详情
    getDetail(id: number) {
        return http.get<ExerciseSet>('exercise-set/' + id);
    },

    // 移除
    remove: (id: number) => {
        return http.patch('exercise-set/remove' + id);
    },

    // 公开
    togglePublic: (id: number, value: boolean) => {
        return http.patch('exercise-set/public' + id, { value });
    },

    // 更新习题集
    update: (id: number, dto: UpdateExerciseSetDTO) => {
        return http.patch('exercise-set/' + id, { ...dto });
    },

    // 新增
    create: (dto: CreateExerciseSetDTO) => {
        return http.post('exercise-set', { ...dto });
    },

    // 更新习题集更新时间
    updateTime: (id: number) => {
        return http.patch('exercise-set/time' + id);
    },
};
