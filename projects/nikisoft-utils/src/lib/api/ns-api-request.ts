import { HttpHeaders } from '@angular/common/http';

/**
 * Wrapper to create API request body and options
 */
export class NsApiRequest {
  private _body: any;
  private _options: any = {};

  /**
   * Gets body of API request
   */
  get body(): any {
    return this._body;
  }

  /**
   * Get options of API request
   */
  get options(): any {
    return this._options;
  }

  /**
   * Gets url of API request
   */
  get url(): string {
    return this._url;
  }

  constructor(private _url: string) {
    this._options.headers = new HttpHeaders();
  }

  /**
   * Sets body of API request
   * @param body
   */
  withBody(body: any): this {
    this._body = body;
    return this;
  }

  /**
   * Adds header
   * @param key Key
   * @param value Value
   */
  addHeader(key: string, value: any): this {
    this._options.headers = this._options.headers.set(key, value);

    return this;
  }
}
