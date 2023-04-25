import { IconType } from '@icon-park/vue-next/lib/all';

export type SkipTarget = 'camp' | 'square';

export interface Menu {
    title: string;
    icon: IconType;
    isActive: boolean;
    routeName: string;
}
