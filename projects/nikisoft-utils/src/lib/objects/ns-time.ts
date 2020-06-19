import { NsNumber } from './ns-number';
import { NsString } from './ns-string';

export class NsTime {
  /**
   * Parse time string in format hh:mm:ss.zzz where zzz are milliseconds.
   * If value is null or empty, returns null
   * @param value
   */
  static parse(value: string): NsTime {
    if (NsString.isNullOrEmpty(value)) {
      return null;
    }

    const timeParts = value.split(':');
    const hour = NsNumber.parseIntFromArray(timeParts, 0);
    const minute = NsNumber.parseIntFromArray(timeParts, 1);
    const seconds = NsNumber.parseIntFromArray(timeParts, 2);

    const millisecondsPart = value.split('.');
    const milliseconds = NsNumber.parseIntFromArray(millisecondsPart, 1);

    return new NsTime(hour, minute, seconds, milliseconds);
  }

  private _hour: number;
  private _minute: number;
  private _seconds: number;
  private _milliseconds: number;

  get hour(): number {
    return this._hour;
  }

  set hour(value: number) {
    this._hour = value;
  }

  get minute(): number {
    return this._minute;
  }

  set minute(value: number) {
    this._minute = value;
  }

  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value;
  }

  get milliseconds(): number {
    return this._milliseconds;
  }

  set milliseconds(value: number) {
    this._milliseconds = value;
  }

  private constructor(hour: number, minute: number, seconds: number, milliseconds: number) {
    this._hour = hour;
    this._minute = minute;
    this._seconds = seconds;
    this._milliseconds = milliseconds;
  }

  toString(): string {
    return `${this._hour}:${this._minute}:${this._seconds}:${this._milliseconds}`;
  }
}
