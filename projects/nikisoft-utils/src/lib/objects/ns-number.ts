import { NsArray } from './ns-array';

export class NsNumber {
  static formatFloatNumber(value: number, digits = 2): string {
    return value == null
      ? null
      : value.toLocaleString(undefined, { maximumFractionDigits: digits, useGrouping: false });
  }

  static formatNumber(value: number, digits = 2): string {
    return value == null ? null : value.toLocaleString(undefined, { minimumIntegerDigits: digits });
  }

  static calculatePercentage(value: number, percentage: number, decimals: number): number {
    let result = (value * percentage) / 100;
    result = NsNumber.roundNumberDown(result, decimals);
    return result;
  }

  static roundNumberDown(value: number, decimals: number): number {
    return Number(Math.floor(Number(`${value}e${decimals}`)) + 'e-' + decimals);
  }

  static roundNumberUp(value: number, decimals: number): number {
    return Number(Math.ceil(Number(`${value}e${decimals}`)) + 'e-' + decimals);
  }

  static parseIntFromArray(items: string[], index: number, defaultValue = 0) {
    const value = NsArray.itemAt(items, index);

    return value == null ? defaultValue : Number.parseInt(value, 10);
  }
}
