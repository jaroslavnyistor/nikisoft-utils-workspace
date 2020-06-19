/**
 * Builds up string with separators
 */
export class NsStringJoiner {
  private _result = '';

  constructor(private _separator: string) {
  }

  /**
   * Clear value
   */
  clear() {
    this._result = '';
  }

  /**
   * Append value and add separator on the end
   * @param value
   */
  append(value: any) {
    this._result += value.toString();
    this._result += this._separator;
  }

  /**
   * Creates result
   */
  toString(): string {
    if (this._result.endsWith(this._separator)) {
      this._result = this._result.slice(0, this._result.length - this._separator.length);
    }

    return this._result;
  }
}
