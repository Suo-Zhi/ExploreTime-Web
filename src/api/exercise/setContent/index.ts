import { DeleteExerciseSetContentDTO, UpsertExerciseSetContentDTO } from './dto';

export default {
    // 更新
    upsert: (dto: UpsertExerciseSetContentDTO) => {
        return http.post('exercise-set-content', { ...dto });
    },

    // 删除
    delete: (dto: DeleteExerciseSetContentDTO) => {
        return http.delete('exercise-set-content', {
            params: { ...dto },
        });
    },
};
