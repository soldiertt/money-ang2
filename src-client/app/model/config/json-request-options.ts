import {RequestOptions, Headers} from "@angular/http";

export class JsonRequestOptions extends RequestOptions {
  constructor() {
    super({
      headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json"
      })
    });
  }
}
