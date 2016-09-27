import {BaseRequestOptions, Headers} from "@angular/http";

export class JsonRequestOptions extends BaseRequestOptions {
    headers:Headers = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
    });
}
