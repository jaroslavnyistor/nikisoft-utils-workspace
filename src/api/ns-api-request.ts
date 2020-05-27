import { HttpHeaders } from '@angular/common/http';

export class NsApiRequest {
   private _body: any;
   private _options: any = {};

   constructor(private _url: string) {
      this._options.headers = new HttpHeaders();
   }

   get body(): any {
      return this._body;
   }

   get options(): any {
      return this._options;
   }

   get url(): string {
      return this._url;
   }

   withBody(body: any): this {
      this._body = body;
      return this;
   }

   withHeader(key: string, value: any): this {
      this._options.headers = this._options.headers.set(key, value);

      return this;
   }
}
