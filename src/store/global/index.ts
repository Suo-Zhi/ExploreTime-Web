import { Message } from '@arco-design/web-vue';
import { PromptType } from './types';

export default defineStore('global', {
    actions: {
        // 提示
        prompt(message: string, type: PromptType = 'info', duration: number = 4000) {
            Message[type]({
                content: message,
                closable: true,
                duration: duration, // 提示时间(毫秒)
            });
        },
    },
});
