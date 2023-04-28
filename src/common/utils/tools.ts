import moment from 'moment';

export const tool = {
    // 时间格式化
    formateTime: (time: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(time).format(format);
    },

    // 判空
    isEmpty: (content: string, type: 'text' | 'rich' = 'rich') => {
        if (type === 'rich') {
            content = content
                .replace('<p>', '')
                .replace('</p>', '')
                .replace('&nbsp;', '')
                .replace('<br>', '');
        }
        return content.trim() === '';
    },
};
