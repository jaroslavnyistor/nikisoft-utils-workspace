import * as moment from 'moment';
import { nsIsNotNullOrEmpty } from '../helpers/strings/ns-helpers-strings';

export class NsDate extends Object {
   protected _value: moment.Moment;

   static min(): NsDate {
      return NsDate.from()
      .setDate(1970, 1, 1);
   }

   static max(): NsDate {
      return NsDate.from()
      .setDate(2099, 11, 31);
   }

   static clone(value: NsDate) {
      return new NsDate(value.toString());
   }

   static nowAsString(): string {
      return NsDate.now().toString();
   }

   static now(): NsDate {
      return new NsDate();
   }

   static fromAsString(value?: any): string {
      return NsDate.from(value)
      .toString();
   }

   static from(value?: string) {
      return new NsDate(value);
   }

   static formatUi(dateString: string): string {
      let result = '';

      if (nsIsNotNullOrEmpty(dateString)) {
         const date = new NsDate(dateString);
         result = date.value.format('ll');
      }

      return result;
   }

   static formatLongMonthFullYear(date: NsDate): string {
      if (date == null) {
         return '';
      }

      let month = date.value.format('MMMM');
      month = month.charAt(0).toUpperCase() + month.substr(1);

      const year = date.value.format('YYYY');

      return `${month} ${year}`;
   }

   static formatDate(date: NsDate, format: string) {
      return date == null
         ? ''
         : date._value.format(format);
   }

   static toJsDate(date: NsDate): Date {
      return date == null
         ? null
         : date.value.toDate();
   }

   static daysInYear(year: number) {
      const start = NsDate.from(`${year}-01-01`);
      const end = NsDate.clone(start)
      .addYears(1)
      .addDays(-1);

      return end.diffInDays(start);
   }

   static createNew(year: number, month: number, day: number) {
      return new NsDate(
         moment()
         .year(year)
         .month(month - 1)
         .date(day)
      );
   }

   static initialize(language: string) {
      moment.locale(language);
   }

   static weekdays(): string[] {
      return moment.weekdays(true);
   }

   static weekdaysShort(): string[] {
      return moment.weekdaysShort(true);
   }

   static weekdaysMin(): string[] {
      return moment.weekdaysMin(true);
   }

   protected get value(): moment.Moment {
      return this._value;
   }

   get year(): number {
      return this.value.year();
   }

   get month(): number {
      return this.value.month();
   }

   get day(): number {
      return this.value.date();
   }

   get dayOfWeek(): number {
      return this.value.day();
   }

   get daysInMonth(): number {
      return this._value.daysInMonth();
   }

   protected constructor(value?: any) {
      super();

      this._value = moment(value);
      this._value.hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0);
   }

   toString(): string {
      return this.value.toISOString(true);
   }

   toDateOnlyString(): string {
      return this.value.format('YYYY-MM-DD');
   }

   setDate(year: number, month: number, day: number): this {
      return this.setYear(year)
      .setMonth(month)
      .setDay(day);
   }

   setYear(value: number): this {
      this.value.year(value);

      return this;
   }

   setMonth(value: number): this {
      this.value.month(value);

      return this;
   }

   setDay(value: number): this {
      this.value.date(value);

      return this;
   }

   addYears(value: number): this {
      this.value.add(value, 'y');

      return this;
   }

   addMonths(value: number): this {
      this.value.add(value, 'M');

      return this;
   }

   addDays(value: number): this {
      this.value.add(value, 'd');

      return this;
   }

   toTomorrow(): this {
      return this.addDays(1);
   }

   toStartOfNextMonth(): this {
      this.toStartOfMonth();
      return this.addMonths(1);
   }

   toStartOfYear(): this {
      this.value.startOf('year');
      return this;
   }

   toStartOfMonth(): this {
      this.value.startOf('month');
      return this;
   }

   toStartOfWeek(): this {
      this._value.startOf('week');
      return this;
   }

   toEndOfYear(): this {
      this._value.endOf('year');

      return this;
   }

   toEndOfMonth(): this {
      this._value.endOf('month');

      return this;
   }

   toEndOfWeek(): this {
      this._value.endOf('week');

      return this;
   }

   isBefore(other: NsDate): boolean {
      return this.value.isBefore(other.value, 'day');
   }

   isSameOrBefore(other: NsDate): boolean {
      return this.value.isSameOrBefore(other.value, 'day');
   }

   isAfter(other: NsDate): boolean {
      return this.value.isAfter(other.value, 'day');
   }

   isSameOrAfter(other: NsDate): boolean {
      return this.value.isSameOrAfter(other.value, 'day');
   }

   isSame(other: NsDate): boolean {
      return other != null
         && this.isSameMonthYear(other)
         && this.day === other.day;
   }

   isSameMonthYear(other: NsDate): boolean {
      return other != null
         && this.year === other.year
         && this.month === other.month;
   }

   isToday() {
      const now = new NsDate();
      return now.isSame(this);
   }

   isBetween(from: NsDate, to: NsDate) {
      return this.isAfter(from) && this.isBefore(to);
   }

   diffInDays(other: NsDate) {
      return this.value.diff(other.value, 'days');
   }

   toHumanReadableString(): string {
      return this._value.format('ll');
   }
}
