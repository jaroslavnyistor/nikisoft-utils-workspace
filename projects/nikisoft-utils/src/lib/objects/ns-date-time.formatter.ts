import { NsDate } from './ns-date';
import { NsDateTime } from './ns-date-time';
import { NsString } from './ns-string';

/**
 * Defines time of formatting
 */
export enum NsDateTimeFormatType {
  /**
   * Date and time with hours and minutes only
   */
  DateTime,
  /**
   * Date only
   */
  Date,
  /**
   * Time only with hours and minutes
   */
  Time,
  /**
   * Time only with hours, minutes and seconds
   */
  TimeWithSeconds,
}

type NsDateTimeFormatTypeMapping = {
  [key in NsDateTimeFormatType]: string;
};

/**
 * Provides formatting of NsDate and NsDateTime instances
 */
export class NsDateTimeFormatter {
  private static Mapping: NsDateTimeFormatTypeMapping = {
    [NsDateTimeFormatType.DateTime]: 'll HH:mm',
    [NsDateTimeFormatType.Date]: 'll',
    [NsDateTimeFormatType.Time]: 'HH:mm',
    [NsDateTimeFormatType.TimeWithSeconds]: 'HH:mm:ss',
  };

  /**
   * Gets format type based on if it should include date and/or time. Default value is
   * NsDateTimeFormatType.DateTime
   *
   * @param includeDate True to include date
   * @param includeTime True to include time
   */
  static getFormatType(includeDate: boolean, includeTime: boolean): NsDateTimeFormatType {
    if (includeDate && !includeTime) {
      return NsDateTimeFormatType.Date;
    }

    if (includeTime && !includeDate) {
      return NsDateTimeFormatType.Time;
    }

    return NsDateTimeFormatType.DateTime;
  }

  /**
   * Formats date and time
   * @param dateTime
   */
  static formatDateTime(dateTime: NsDateTime): string {
    return NsDateTimeFormatter.formatByType(dateTime, NsDateTimeFormatType.DateTime);
  }

  /**
   * Formats only date
   * @param date
   */
  static formatDate(date: NsDate): string {
    return NsDateTimeFormatter.formatByType(date, NsDateTimeFormatType.Date);
  }

  /**
   * Formats time from string. Useful when the time is represented as ISO string and want to
   * convert to standard time string.
   * @param value
   * @param includeSeconds
   */
  static formatTimeFromString(value: string, includeSeconds = false): string {
    const dateTime = NsDateTime.from(value);
    if (dateTime == null) {
      return null;
    }

    return NsDateTimeFormatter.formatTime(dateTime, includeSeconds);
  }

  /**
   * Formats time
   * @param dateTime
   * @param includeSeconds
   */
  static formatTime(dateTime: NsDateTime, includeSeconds = false): string {
    const formatType = includeSeconds ? NsDateTimeFormatType.TimeWithSeconds : NsDateTimeFormatType.Time;
    return NsDateTimeFormatter.formatByType(dateTime, formatType);
  }

  /**
   * Formats date/time by type
   * @param date
   * @param type
   */
  static formatByType(date: NsDate, type: NsDateTimeFormatType): string {
    if (date == null) {
      return null;
    }

    const format = NsDateTimeFormatter.Mapping[type];
    return date.format(format);
  }

  /**
   * Formats date/time to long name of month and long year
   * @param date
   */
  static formatLongMonthFullYear(date: NsDate): string {
    if (date == null) {
      return '';
    }

    let month = date.format('MMMM');
    month = NsString.firstUpper(month);

    const year = date.format('YYYY');

    return `${month} ${year}`;
  }

  /**
   * Formats date time range as time
   * @param start
   * @param finish
   */
  static formatDateRangeAsTime(start: string, finish: string): string {
    const startDateTime = NsDateTimeFormatter.formatTimeFromString(start);
    const finishDateTime = NsDateTimeFormatter.formatTimeFromString(finish);
    return NsString.join(' - ', [startDateTime, finishDateTime]);
  }
}
