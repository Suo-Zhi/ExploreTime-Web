import moment from 'moment';

export const tool = {
    formateTime: (time: Date, format: string = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(time).format(format);
    },
};
