import {BaseRequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class JsonRequestOptions extends BaseRequestOptions {
    constructor () {
        super();
        this.headers.append("Content-Type", "application/json; charset=utf-8");
        this.headers.append("Accept", "application/json");
    }
}
