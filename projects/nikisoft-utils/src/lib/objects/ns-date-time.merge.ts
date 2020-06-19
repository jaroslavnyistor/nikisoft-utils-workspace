import { NsDate } from './ns-date';
import { NsDateTime } from './ns-date-time';
import { NsString } from './ns-string';
import { NsTime } from './ns-time';

export class NsDateTimeMerge {
  /**
   * Merges dateString into dateTimeString. If dateString or fallbackDateString are null or undefined,
   * the date is not changed. The value fallbackDateString is fallback value.
   *
   * Returns the value as string.
   *
   * @param dateTimeString The value to change.
   * @param dateString The date to apply as string
   * @param fallbackDateString Fallback date as string(optional)
   */
  static mergeDateString(dateTimeString: string, dateString: string, fallbackDateString?: string): string {
    return NsDateTimeMerge.mergeAsString(dateTimeString, dateString, null, fallbackDateString, null);
  }

  /**
   * Merges dateString into dateTimeString. If dateString or fallbackDateString are null or undefined,
   * the date is not changed. The value fallbackDateString is fallback value.
   *
   * Returns the value as instance of NsDateTime.
   *
   * @param dateTimeString The value to change.
   * @param dateString The date to apply as string
   * @param fallbackDateString Fallback date as string(optional)
   */
  static mergeDate(dateTimeString: string, dateString: string, fallbackDateString?: string): NsDateTime {
    return NsDateTimeMerge.mergeDateTime(dateTimeString, dateString, null, fallbackDateString, null);
  }

  /**
   * Merges timeString into dateTimeString. If timeString or fallbackTimeString are null or undefined,
   * the date is not changed. The value fallbackTimeString is fallback value.
   *
   * Returns the value as string.
   *
   * @param dateTimeString The value to change.
   * @param timeString The date to apply as string
   * @param fallbackTimeString Fallback date as string(optional)
   */
  static mergeTimeString(dateTimeString: string, timeString: string, fallbackTimeString?: string): string {
    return NsDateTimeMerge.mergeAsString(dateTimeString, null, timeString, null, fallbackTimeString);
  }

  /**
   * Merges timeString into dateTimeString. If timeString or fallbackTimeString are null or undefined,
   * the date is not changed. The value fallbackTimeString is fallback value.
   *
   * Returns the value as instance of NsDateTime.
   *
   * @param dateTimeString The value to change.
   * @param timeString The date to apply as string
   * @param fallbackTimeString Fallback date as string(optional)
   */
  static mergeTime(dateTimeString: string, timeString: string, fallbackTimeString?: string): NsDateTime {
    return NsDateTimeMerge.mergeDateTime(dateTimeString, null, timeString, null, fallbackTimeString);
  }

  /**
   * Merges dateString and timeString into dateTimeString.If dateString or fallbackDateString
   * are null or undefined, the date is not changed. The value fallbackDateString is fallback value.
   *
   * The same rules apply for timeString and fallbackTimeString.
   *
   * Returns the value as string.
   *
   * @param dateTimeString The value to change.
   * @param dateString The date to apply as string
   * @param timeString The time to apply as string
   * @param fallbackDateString Fallback date as string(optional)
   * @param fallbackTimeString Fallback time as string(optional)
   */
  static mergeAsString(
    dateTimeString: string,
    dateString: string,
    timeString: string,
    fallbackDateString?: string,
    fallbackTimeString?: string,
  ): string {
    const dateTime = NsDateTimeMerge.mergeDateTime(
      dateTimeString,
      dateString,
      timeString,
      fallbackDateString,
      fallbackTimeString,
    );

    return dateTime == null ? null : dateTime.toString();
  }

  /**
   * Merges dateString and timeString into dateTimeString.If dateString or fallbackDateString
   * are null or undefined, the date is not changed. The value fallbackDateString is fallback value.
   *
   * The same rules apply for timeString and fallbackTimeString.
   *
   * Returns the value as string.
   *
   * @param dateTimeString The value to change.
   * @param dateString The date to apply as string
   * @param timeString The time to apply as string
   * @param fallbackDateString Fallback date as string(optional)
   * @param fallbackTimeString Fallback time as string(optional)
   */
  static mergeDateTime(
    dateTimeString: string,
    dateString: string,
    timeString: string,
    fallbackDateString?: string,
    fallbackTimeString?: string,
  ): NsDateTime {
    let result = NsDateTime.from(dateTimeString);

    if (result == null) {
      result = NsDateTime.now();
    }

    const date = NsDate.from(NsString.nullOrEmpty(dateString, fallbackDateString));
    const time = NsTime.parse(NsString.nullOrEmpty(timeString, fallbackTimeString));

    if (date != null) {
      result.setDate(date.year, date.month, date.day);
    }

    if (time != null) {
      result.setTime(time.hour, time.minute, time.seconds, time.milliseconds);
    }

    return result;
  }
}
