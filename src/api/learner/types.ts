import { UserInfo } from '@/store/user/types';

export interface Learner extends UserInfo {
    isFollow: boolean;
}
