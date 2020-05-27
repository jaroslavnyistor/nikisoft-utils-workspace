import * as moment from 'moment';
import { nsStringJoin } from '../helpers/strings/ns-helpers-strings';
import { NsDate } from './ns-date';

export class NsDateTime extends NsDate {
  static now(): NsDateTime {
    return new NsDateTime();
  }

  static nowAsString(): string {
    return NsDateTime.now().toString();
  }

  static min(): NsDateTime {
    return NsDateTime.from().setDate(1970, 1, 1).setBeginOfDay();
  }

  static max(): NsDateTime {
    return NsDateTime.from().setDate(2099, 11, 31).setEndOfDay();
  }

  static timeOnly(hours: number, minutes: number, date?: string): NsDateTime {
    const result = NsDateTime.from(date);
    result.setTime(hours, minutes);
    return result;
  }

  static clone(value: NsDateTime): NsDateTime {
    return new NsDateTime(value.toString());
  }

  static fromAsString(value?: any): string {
    return NsDateTime.from(value).toString();
  }

  static from(value?: any): NsDateTime {
    return new NsDateTime(value);
  }

  static formatTimeOnlyRangeAsString(start: any, finish: any) {
    const startDateTime = NsDateTime.formatTimeOnlyAsString(start);
    const finishDateTime = NsDateTime.formatTimeOnlyAsString(finish);
    return nsStringJoin(' - ', [startDateTime, finishDateTime]);
  }

  static formatTimeOnlyAsString(value?: any): string {
    if (value == null) {
      return null;
    }

    const dateTime = NsDateTime.from(value);
    return dateTime._value.format('HH:mm');
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
    return this.value.isBefore(other.value, 'second');
  }

  isSameOrBefore(other: NsDateTime): boolean {
    return this.value.isSameOrBefore(other.value, 'second');
  }

  isAfter(other: NsDateTime): boolean {
    return this.value.isAfter(other.value, 'second');
  }

  isSameOrAfter(other: NsDateTime): boolean {
    return this.value.isSameOrAfter(other.value, 'second');
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

  toHumanReadableString(includeSeconds = false): string {
    let format = 'll HH:mm';
    if (includeSeconds) {
      format += ':ss';
    }

    return this._value.format(format);
  }
}
