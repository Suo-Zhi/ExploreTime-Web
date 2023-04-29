import moment from 'moment';

export const tool = {
    // 时间格式化
    formateTime: (time: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(time).format(format);
    },

    // 判空
    isEmpty: (content: string, prompt: string, type: 'text' | 'rich' = 'rich') => {
        if (type === 'rich') {
            content = content
                .replace(/<p>/g, '')
                .replace(/<\/p>/g, '')
                .replace(/&nbsp;/g, '')
                .replace(/<br>/g, '');
        }
        if (content.trim() === '') store.global().prompt(`${prompt}不能为空`, 'warning');
        return content.trim() === '';
    },
};
