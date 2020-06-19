import { NsDate } from './ns-date';
import { NsDateTime } from './ns-date-time';
import { NsString } from './ns-string';

export enum NsDateTimeFormatType {
  DateTime,
  Date,
  Time,
  TimeWithSeconds,
}

type NsDateTimeFormatTypeMapping = {
  [key in NsDateTimeFormatType]: string;
};

export class NsDateTimeFormatter {
  private static Mapping: NsDateTimeFormatTypeMapping = {
    [NsDateTimeFormatType.DateTime]: 'll HH:mm',
    [NsDateTimeFormatType.Date]: 'll',
    [NsDateTimeFormatType.Time]: 'HH:mm',
    [NsDateTimeFormatType.TimeWithSeconds]: 'HH:mm:ss',
  };

  static getFormatType(includeDate: boolean, includeTime: boolean): NsDateTimeFormatType {
    if (includeDate && !includeTime) {
      return NsDateTimeFormatType.Date;
    }

    if (includeTime && !includeDate) {
      return NsDateTimeFormatType.Time;
    }

    return NsDateTimeFormatType.DateTime;
  }

  static formatDateTime(date: NsDate): string {
    return NsDateTimeFormatter.formatByType(date, NsDateTimeFormatType.DateTime);
  }

  static formatDate(date: NsDate): string {
    return NsDateTimeFormatter.formatByType(date, NsDateTimeFormatType.Date);
  }

  static formatTime(date: NsDate, includeSeconds = false): string {
    const formatType = includeSeconds ? NsDateTimeFormatType.TimeWithSeconds : NsDateTimeFormatType.Time;
    return NsDateTimeFormatter.formatByType(date, formatType);
  }

  static formatByType(date: NsDate, type: NsDateTimeFormatType): string {
    if (date == null) {
      return null;
    }

    const format = NsDateTimeFormatter.Mapping[type];
    return date.format(format);
  }

  static formatLongMonthFullYear(date: NsDate): string {
    if (date == null) {
      return '';
    }

    let month = date.format('MMMM');
    month = NsString.firstUpper(month);

    const year = date.format('YYYY');

    return `${month} ${year}`;
  }

  static formatDateRangeAsHoursAndMinutesOnly(start: string, finish: string) {
    const startDateTime = NsDateTimeFormatter.formatAsHoursAndMinutesOnly(start);
    const finishDateTime = NsDateTimeFormatter.formatAsHoursAndMinutesOnly(finish);
    return NsString.join(' - ', [startDateTime, finishDateTime]);
  }

  static formatAsHoursAndMinutesOnly(value?: string): string {
    if (value == null) {
      return null;
    }

    const dateTime = NsDateTime.from(value);
    return dateTime == null ? null : NsDateTimeFormatter.formatTime(dateTime);
  }
}
