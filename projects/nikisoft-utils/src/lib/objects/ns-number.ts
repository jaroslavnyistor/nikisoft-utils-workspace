import { NsArray } from './ns-array';

export class NsNumber {
  /**
   * Formats float value with specific fraction digits
   * @param value Float number
   * @param digits Number of fraction  digits. Default is 2.
   */
  static formatFloatNumber(value: number, digits = 2): string {
    return value == null
           ? null
           : value.toLocaleString(undefined, { maximumFractionDigits: digits, useGrouping: false });
  }

  /**
   * Formats value with minimum length of digits
   * @param value number
   * @param digits Minimum length of digits. Default is 2.
   */
  static formatNumber(value: number, digits = 2): string {
    return value == null ? null : value.toLocaleString(undefined, { minimumIntegerDigits: digits });
  }

  /**
   * Calculates percentage and round the result down.
   * @param value Value
   * @param percentage Percentage
   * @param decimals Number of fraction digits
   */
  static calculatePercentage(value: number, percentage: number, decimals: number): number {
    let result = (value * percentage) / 100;
    result = NsNumber.roundNumberDown(result, decimals);
    return result;
  }

  /**
   * Rounds down the number
   * @param value
   * @param decimals
   */
  static roundNumberDown(value: number, decimals: number): number {
    return Number(Math.floor(Number(`${value}e${decimals}`)) + 'e-' + decimals);
  }

  /**
   * Rounds up the number
   * @param value
   * @param decimals
   */
  static roundNumberUp(value: number, decimals: number): number {
    return Number(Math.ceil(Number(`${value}e${decimals}`)) + 'e-' + decimals);
  }

  /**
   * Gets number from array of string from specific index. If the index is out range,
   * returns defaultValue
   * @param items
   * @param index
   * @param defaultValue
   */
  static parseIntFromArray(items: string[], index: number, defaultValue = 0) {
    const value = NsArray.itemAt(items, index);

    return value == null ? defaultValue : Number.parseInt(value, 10);
  }
}
