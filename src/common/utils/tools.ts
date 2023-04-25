import moment from 'moment';

export const tool = {
    formateTime: (time: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(time).format(format);
    },
};
