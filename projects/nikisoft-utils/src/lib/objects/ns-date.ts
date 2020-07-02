import moment from 'moment';
import { NsDayOfWeek } from './ns-day-of-week';
import { NsString } from './ns-string';

/**
 * Class which helps to abstract away work with date only.
 */
export class NsDate extends Object {
  protected _value: moment.Moment;

  /**
   * Returns minimal value.
   * @returns {NsDate}
   */
  static min(): NsDate {
    return NsDate.now().setDate(1970, 1, 1);
  }

  /**
   * Returns maximal value
   * @returns {NsDate}
   */
  static max(): NsDate {
    return NsDate.now().setDate(2099, 11, 31);
  }

  /**
   * Creates a cloned value. If value is null, returns null
   * @param value Instance of NsDate or null.
   */
  static clone(value: NsDate): NsDate {
    return value == null ? null : new NsDate(value.toString());
  }

  /**
   * Returns current date as string
   */
  static nowAsString(): string {
    return NsDate.now().toString();
  }

  /**
   * Returns current date as instance of NsDate
   */
  static now(): NsDate {
    return new NsDate();
  }

  /**
   * Returns string converted from value to NsDate and then to string.
   * If value is null or empty, returns null.
   * @param value Value to convert
   */
  static fromAsString(value: string): string {
    return NsString.isNullOrEmpty(value) ? null : NsDate.from(value).toString();
  }

  /**
   * Returns instance of NsDate from value. If value is null or empty, returns null.
   * @param value Value to convert
   */
  static from(value: string): NsDate {
    return NsString.isNullOrEmpty(value) ? null : new NsDate(value);
  }

  /**
   * Converts string to Date object.
   * @param value Value to convert
   */
  static toJsDateFromString(value: string): Date {
    const result = NsDate.from(value);
    return NsDate.toJsDate(result);
  }

  /**
   * Converts instance of NsDate to Date object.
   * @param date Instance of NsDate.
   */
  static toJsDate(date: NsDate): Date {
    return date == null ? null : date.value.toDate();
  }

  /**
   * Returns count of days in given year
   * @param year The given year.
   */
  static daysInYear(year: number): number {
    const start = NsDate.from(`${year}-01-01`);
    const end = NsDate.clone(start).addYears(1).addDays(-1);

    return end.diffInDays(start);
  }

  /**
   * Creates a new instance of NsDate for given year, month and day
   * @param year The given year
   * @param month Month 1-12
   * @param day Day 1-31
   */
  static createNew(year: number, month: number, day: number): NsDate {
    return new NsDate()
      .setDate(year, month, day);
  }

  /**
   * Performs initialization based on provided language string
   * @param language Language string
   */
  static initialize(language: string) {
    moment.locale(language);
  }

  /**
   * Gets names of weekdays
   */
  static weekdays(): string[] {
    return moment.weekdays(true);
  }

  /**
   * Gets short names of weekdays
   */
  static weekdaysShort(): string[] {
    return moment.weekdaysShort(true);
  }

  /**
   * Gets minimalistic names of weekdays
   */
  static weekdaysMin(): string[] {
    return moment.weekdaysMin(true);
  }

  // /**
  //  * Check if date param is Moment, then converts it to ISO string, otherwise
  //  * returns the value of date param.
  //  * @param date
  //  */
  // static anyDateToString(date: any): string {
  //   return isMoment(date) ? date.toISOString() : date;
  // }

  protected get value(): moment.Moment {
    return this._value;
  }

  /**
   * Gets year
   */
  get year(): number {
    return this.value.year();
  }

  /**
   * Gets month
   */
  get month(): number {
    return this.value.month();
  }

  /**
   * Gets day
   */
  get day(): number {
    return this.value.date();
  }

  /**
   * Gets day of week
   */
  get dayOfWeek(): NsDayOfWeek {
    return this.value.day() as NsDayOfWeek;
  }

  /**
   * Get the number of days in the current month.
   */
  get daysInMonth(): number {
    return this._value.daysInMonth();
  }

  get isWeekend(): boolean {
    return this.dayOfWeek === NsDayOfWeek.Saturday || this.dayOfWeek === NsDayOfWeek.Sunday;
  }

  protected constructor(value?: any) {
    super();

    this._value = moment(value);
    this._value.hours(0).minutes(0).seconds(0).milliseconds(0);
  }

  /**
   * Returns ISO string
   */
  toString(): string {
    return this.value.toISOString(true);
  }

  /**
   * Sets the date
   * @param year Year
   * @param month Month
   * @param day Day
   */
  setDate(year: number, month: number, day: number): this {
    return this.setYear(year).setMonth(month).setDay(day);
  }

  /**
   * Sets year
   * @param value
   */
  setYear(value: number): this {
    this.value.year(value);

    return this;
  }

  /**
   * Sets month
   * @param value
   */
  setMonth(value: number): this {
    this.value.month(value);

    return this;
  }

  /**
   * Sets day
   * @param value
   */
  setDay(value: number): this {
    this.value.date(value);

    return this;
  }

  /**
   * Add specific value to year field. Can be negative
   * @param value
   */
  addYears(value: number): this {
    this.value.add(value, 'y');

    return this;
  }

  /**
   * Add specific value to month field. Can be negative
   * @param value
   */
  addMonths(value: number): this {
    this.value.add(value, 'M');

    return this;
  }

  /**
   * Add specific value to day field. Can be negative
   * @param value
   */
  addDays(value: number): this {
    this.value.add(value, 'd');

    return this;
  }

  /**
   * Moves the date to tomorrow
   */
  toTomorrow(): this {
    return this.addDays(1);
  }

  /**
   * Moves the date to start of next month
   */
  toStartOfNextMonth(): this {
    this.toStartOfMonth();
    return this.addMonths(1);
  }

  /**
   * To start of year
   */
  toStartOfYear(): this {
    this.value.startOf('year');
    return this;
  }

  /**
   * To start of month
   */
  toStartOfMonth(): this {
    this.value.startOf('month');
    return this;
  }

  /**
   * To start of week
   */
  toStartOfWeek(): this {
    this._value.startOf('week');
    return this;
  }

  /**
   * To end of year
   */
  toEndOfYear(): this {
    this._value.endOf('year');

    return this;
  }

  /**
   * To end of month
   */
  toEndOfMonth(): this {
    this._value.endOf('month');

    return this;
  }

  /**
   * To end of week
   */
  toEndOfWeek(): this {
    this._value.endOf('week');

    return this;
  }

  /**
   * Compares if the date is before other date
   * @param other
   */
  isBefore(other: NsDate): boolean {
    return other == null || this.value.isBefore(other.value, 'day');
  }

  /**
   * Compares if the date is same or before the other date
   * @param other
   */
  isSameOrBefore(other: NsDate): boolean {
    return other == null || this.value.isSameOrBefore(other.value, 'day');
  }

  /**
   * Compares if the date is after the other date
   * @param other
   */
  isAfter(other: NsDate): boolean {
    return other == null || this.value.isAfter(other.value, 'day');
  }

  /**
   * Compares if the date is same or after the other date
   * @param other
   */
  isSameOrAfter(other: NsDate): boolean {
    return other == null || this.value.isSameOrAfter(other.value, 'day');
  }

  /**
   * Compares if the date is same as the other date
   * @param other
   */
  isSame(other: NsDate): boolean {
    return other != null && this.isSameMonthYear(other) && this.day === other.day;
  }

  /**
   * Compares if the date's month and year is same as the other date's month and year
   * @param other
   */
  isSameMonthYear(other: NsDate): boolean {
    return other != null && this.year === other.year && this.month === other.month;
  }

  /**
   * Determines if the date is today's
   */
  isToday(): boolean {
    return NsDate.now().isSame(this);
  }

  /**
   * Determines if the date is between from and to dates.
   * @param from
   * @param to
   */
  isBetween(from: NsDate, to: NsDate): boolean {
    return this.isAfter(from) && this.isBefore(to);
  }

  /**
   * Gets difference between this date and other in years.
   * @param other
   */
  diffInYears(other: NsDate): number {
    return other == null ? 0 : this.value.diff(other.value, 'years');
  }

  /**
   * Gets difference between this date and other in months.
   * @param other
   */
  diffInMonths(other: NsDate): number {
    return other == null ? 0 : this.value.diff(other.value, 'months');
  }

  /**
   * Gets difference between this date and other in days.
   * @param other
   */
  diffInDays(other: NsDate): number {
    return other == null ? 0 : this.value.diff(other.value, 'days');
  }

  /**
   * Formats the instance
   * @param format Format to use
   */
  format(format: string): string {
    return this.value.format(format);
  }
}
