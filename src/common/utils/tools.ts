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

    // 获取节点标题前缀
    getNodePrefix: (deep: number, order: number, parentPrefix: string = '') => {
        const firstLevel = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'];
        switch (deep) {
            case 1:
                return firstLevel[order] + '、';
            case 2:
                return order + 1 + '.';
            case 3:
                return parentPrefix + (order + 1);
            default:
                return parentPrefix + '.' + (order + 1);
        }
    },
};
