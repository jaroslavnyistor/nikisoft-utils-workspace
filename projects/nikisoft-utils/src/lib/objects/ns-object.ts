import { NsString } from './ns-string';

export class NsObject {
  /**
   * If value is null or undefined, returns defaultValue, otherwise value
   * @param value Value
   * @param defaultValue Default value to return
   */
  static nullOrDefaultValue(value: any, defaultValue: any) {
    return value == null ? defaultValue : value;
  }

  /**
   * Determines if value's property is null||undefined, then return defaultValue
   * @param value
   * @param property
   * @param defaultValue
   */
  static propertyNullOrDefault<TValue, TValueProperty>(
    value: TValue,
    property: string,
    defaultValue: TValueProperty,
  ): TValueProperty {
    return value == null ? defaultValue : value[property];
  }

  /**
   * Determines if value has any value
   * @param value
   */
  static hasValue(value: any): boolean {
    if (NsObject.isString(value)) {
      return NsString.isNotNullOrEmpty(value as string);
    }

    return value != null;
  }

  /**
   * Iterates over object's own properties and for each properties
   * calls callback
   * @param value Value
   * @param callback To be called for each property
   */
  static iterateProperties(value: any, callback: (prop: string, propValue: any) => void) {
    for (const prop in value) {
      if (value.hasOwnProperty(prop)) {
        const propValue = value[prop];

        callback(prop, propValue);
      }
    }
  }

  /**
   * Formats the value based on its type
   * @param value
   */
  static format(value: any): string {
    if (NsObject.isNumber(value)) {
      return value;
    }

    if (NsObject.isBoolean(value)) {
      return value;
    }

    return `"${value}"`;
  }

  /**
   * Determines if value is object
   * @param value Value
   */
  static isObject(value: any): boolean {
    return typeof value === 'object';
  }

  /**
   * Determines if value is number
   * @param value Value
   */
  static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  /**
   * Determines if value is boolean
   * @param value Value
   */
  static isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  /**
   * Determines if the value is string
   * @param value
   */
  static isString(value: any) {
    return value != null && value.length !== undefined;
  }
}
