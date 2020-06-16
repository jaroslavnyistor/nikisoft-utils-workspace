/**
 * Set of functions which operates on array objects.
 */
import { NsObject } from "./ns-object";

export class NsArray {
  /**
   * Determines if array is empty or count of items in array is equal to count param.
   * @param value Array
   * @param count Optional parameter, defines what empty means
   */
  static isEmpty(value: any[], count = 0): boolean {
    return NsArray.hasItems(value, count) === false;
  }

  /**
   * Determines if array has items that means array.length > count
   * @param value Array
   * @param count Optional parameter, defines count items which means that array is empty
   */
  static hasItems(value: any[], count = 0): boolean {
    return value != null && value.length > count;
  }

  /**
   * Get item at index position or null if idx is out range
   * @param value Array
   * @param idx Index of the item
   */
  static itemAt<T>(value: T[], idx: number): T {
    if (NsArray.hasItems(value, idx)) {
      return value[idx];
    }

    return undefined;
  }

  /**
   * Filters out null or undefined value out of the array
   * @param value
   */
  static exceptNull<T>(value: T[]): T[] {
    const callback = (item) => item != null;

    return value == null ? null : value.filter(callback);
  }

  /**
   * For each item in array, applies transformation for null values, otherwise
   * leaves the array as it is.
   * @param value The array
   * @param defaultValue Default value for item which is null|undefined.
   */
  static nullOrDefaultValue<T>(value: T[], defaultValue: T): T[] {
    const callback = (item) => NsObject.nullOrDefaultValue(item, defaultValue);

    return value == null ? null : value.map(callback);
  }

  /**
   * For each item in array, applies transformation for null values, otherwise
   * leaves the array as it is.
   * @param value The array
   * @param fn Function which returns default value for item which is null|undefined.
   */
  static nullOrDefaultValueFrom<T>(value: T[], fn: () => T): T[] {
    const callback = (item) => NsObject.nullOrDefaultValueFrom(item, fn);

    return value == null ? null : value.map(callback);
  }
}
