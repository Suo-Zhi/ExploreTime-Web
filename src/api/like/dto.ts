export interface CreateLikeDTO {
    targetType: 'feedback' | 'reply';
    targetId: number;
}
