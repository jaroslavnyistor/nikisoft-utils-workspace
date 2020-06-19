import moment from 'moment';
import { NsDate } from './ns-date';

/**
 * Class which helps to abstract away work with date and time
 */
export class NsDateTime extends NsDate {
  /**
   * Returns minimal value.
   * @returns {NsDateTime}
   */
  static min(): NsDateTime {
    return NsDateTime.from().setDate(1970, 1, 1).setBeginOfDay();
  }

  /**
   * Returns maximal value
   * @returns {NsDate}
   */
  static max(): NsDateTime {
    return NsDateTime.from().setDate(2099, 11, 31).setEndOfDay();
  }

  /**
   * Get current date and time.
   */
  static now(): NsDateTime {
    return new NsDateTime();
  }

  /**
   * Gets current date and time as string
   */
  static nowAsString(): string {
    return NsDateTime.now().toString();
  }

  /**
   * Creates a cloned value. If value is null, returns null
   * @param value Instance of NsDateTime or null.
   */
  static clone(value: NsDateTime): NsDateTime {
    return value == null ? null : new NsDateTime(value.toString());
  }

  /**
   * Returns string converted from value to NsDate and then to string.
   * If value is null, returns null.
   * @param value Value to convert
   */
  static fromAsString(value?: any): string {
    return value == null ? null : NsDateTime.from(value).toString();
  }

  /**
   * Returns instance of NsDateTime from value. If value is null, returns null.
   * @param value Value to convert
   */
  static from(value?: any): NsDateTime {
    return value == null ? null : new NsDateTime(value);
  }

  /**
   * Converts string to Date object.
   * @param value Value to convert
   */
  static toJsDateFromString(value: string): Date {
    const result = NsDateTime.from(value);
    return NsDateTime.toJsDate(result);
  }

  /**
   * Converts instance of NsDateTime to Date object.
   * @param date Instance of NsDate.
   */
  static toJsDate(date: NsDateTime): Date {
    return date == null ? null : date.value.toDate();
  }

  static isOverlapping(a: NsDateTime, b: NsDateTime, c: NsDateTime, d: NsDateTime) {
    return !(d.isBefore(a) || b.isBefore(c));
  }

  get hour(): number {
    return this.value.hour();
  }

  get minutes(): number {
    return this.value.minute();
  }

  get seconds(): number {
    return this.value.second();
  }

  get milliseconds(): number {
    return this.value.millisecond();
  }

  private constructor(value?: any) {
    super(value);

    this._value = moment(value);
  }

  setTime(hour: number, minutes: number, seconds = 0, milliseconds = 0): this {
    return this.setHour(hour).setMinutes(minutes).setSeconds(seconds).setMilliseconds(milliseconds);
  }

  setHour(hour: number): this {
    this.value.hours(hour || 0);
    return this;
  }

  setMinutes(minutes: number): this {
    this.value.minutes(minutes || 0);
    return this;
  }

  setSeconds(seconds: number): this {
    this.value.seconds(seconds || 0);
    return this;
  }

  setMilliseconds(milliseconds: number): this {
    this.value.milliseconds(milliseconds || 0);
    return this;
  }

  addHours(value: number): this {
    this.value.add(value, 'h');

    return this;
  }

  addMinutes(value: number): this {
    this.value.add(value, 'm');

    return this;
  }

  addSeconds(value: number): this {
    this.value.add(value, 's');

    return this;
  }

  addMilliseconds(value: number): this {
    this.value.add(value, 'ms');

    return this;
  }

  setBeginOfDay(): this {
    return this.setHour(0).resetMinutesSecondsMilliseconds();
  }

  setEndOfDay(): this {
    return this.setHour(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
  }

  resetMinutesSecondsMilliseconds(): this {
    this.setMinutes(0);
    this.resetSecondsMilliseconds();
    return this;
  }

  resetSecondsMilliseconds(): this {
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
  }

  isBefore(other: NsDateTime): boolean {
    return other == null || this.value.isBefore(other.value, 'second');
  }

  isSameOrBefore(other: NsDateTime): boolean {
    return other == null || this.value.isSameOrBefore(other.value, 'second');
  }

  isAfter(other: NsDateTime): boolean {
    return other == null || this.value.isAfter(other.value, 'second');
  }

  isSameOrAfter(other: NsDateTime): boolean {
    return other == null || this.value.isSameOrAfter(other.value, 'second');
  }

  isSameDate(other: NsDateTime): boolean {
    return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
  }

  diffInHours(other: NsDateTime) {
    return this.value.diff(other.value, 'hours');
  }

  toStartOfDay(): this {
    return this.setHour(0).resetMinutesSecondsMilliseconds();
  }

  toEndOfDay(): this {
    return this.setHour(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
  }
}
