/**
 * Set of helper functions to work with strings in safer way.
 */
export class NsString {
  /**
   * Gets the length of the value, 0 if value is null
   * @param value String
   */
  static getLength(value: string): number {
    return value == null ? 0 : value.length;
  }

  /**
   * Determines if value is null or empty
   * @param value
   */
  static isNullOrEmpty(value: string): boolean {
    return value == null || value.length === 0;
  }

  /**
   * Determines if the value is not null and empty
   * @param value
   */
  static isNotNullOrEmpty(value: string): boolean {
    return !NsString.isNullOrEmpty(value);
  }

  /**
   * Return value, if value is not null or empty, otherwise defaultValue
   * @param value
   * @param defaultValue
   */
  static nullOrEmpty(value: string, defaultValue: string): string {
    return NsString.isNullOrEmpty(value) ? defaultValue : value;
  }

  /**
   * Formats the value, where each item from params is replaced based on its index
   * in string. Index is recognized in string as {0}, {1} etc
   * @param value
   * @param params
   */
  static format(value: string, ...params: any[]): string {
    let result = value;

    if (params != null) {
      params.forEach((param, index) => {
        if (NsString.isNotNullOrEmpty(param)) {
          const replacement = `{{${index}}}`;
          result = result.replace(replacement, param);
        }
      });
    }

    return result;
  }

  /**
   * Joins texts with space
   * @param texts
   */
  static joinBySpace(...texts: string[]): string {
    return NsString.join(' ', texts);
  }

  /**
   * Joins values by separator
   * @param separator
   * @param values
   */
  static join(separator: string, values: string[]): string {
    let result = '';

    values.forEach((value) => {
      if (NsString.isNotNullOrEmpty(value)) {
        result += value;
        result += separator;
      }
    });

    if (result.length > separator.length) {
      result = result.slice(0, result.length - separator.length);
    }

    return result;
  }

  /**
   * Add prefix and postfix to value if value is not empty.
   * @param value
   * @param prefix
   * @param postfix
   */
  static prePostFix(value: string, prefix: string, postfix: string): string {
    return NsString.prefix(NsString.postfix(value, postfix), prefix);
  }

  /**
   * Add prefix to value if value is not empty.
   * @param value
   * @param prefix
   */
  static prefix(value: string, prefix: string): string {
    return NsString.isNullOrEmpty(value) ? '' : `${prefix}${value}`;
  }

  /**
   * Add postfix to value if value is not empty.
   * @param value
   * @param postfix
   */
  static postfix(value: string, postfix: string): string {
    return NsString.isNullOrEmpty(value) ? '' : `${value}${postfix}`;
  }

  /**
   * Converts string to float-pointing number
   * @param value
   */
  static toNumber(value: string): number {
    return value == null ? null : Number.parseFloat(value);
  }

  /**
   * Converts 1st character to upper case.
   * @param value
   */
  static firstUpper(value: string): string {
    return value == null ? null : value[0].toUpperCase() + value.substr(1);
  }

  /**
   * Converts 1st character to lower case.
   * @param value
   */
  static firstLower(value: string) {
    return value == null ? null : value[0].toLowerCase() + value.substr(1);
  }

  /**
   * Gets hashcode of a string
   * @param s
   */
  static getHashCode(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }

    return h;
  }

  /**
   * Determines if value contains search
   * @param value
   * @param search
   */
  static contains(value: string, search: string) {
    return NsString.isNullOrEmpty(value) || NsString.isNullOrEmpty(search) ? false : value.indexOf(search) > -1;
  }
}
