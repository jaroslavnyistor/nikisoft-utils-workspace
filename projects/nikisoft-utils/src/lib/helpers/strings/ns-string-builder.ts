export class NsStringBuilder {
  private _result = '';

  constructor(private _separator: string) {}

  clear() {
    this._result = '';
  }

  append(value: any) {
    this._result += value.toString();
    this._result += this._separator;
  }

  toString(): string {
    if (this._result.endsWith(this._separator)) {
      this._result = this._result.slice(0, this._result.length - this._separator.length);
    }

    return this._result;
  }
}
