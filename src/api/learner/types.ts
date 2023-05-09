import { UserInfo } from '@/store/user/types';

export interface Learner extends UserInfo {
    isFollow: {
        value: boolean;
        id: number | null;
    };
}
