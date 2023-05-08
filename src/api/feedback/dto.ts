import { DiscussType } from '@/store/square/types';

export interface FindFeedbackDTO {
    targetId: number;
    targetType: DiscussType;
    keywords: string;
}
