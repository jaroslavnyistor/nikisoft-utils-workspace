import { isMoment } from 'moment';

export function nsValidateDate(date: any) {
   return isMoment(date)
      ? date.toISOString()
      : date;
}
