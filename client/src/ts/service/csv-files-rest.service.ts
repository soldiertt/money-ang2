import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import {AccountSetting} from "../model/core/account-setting.class";
import {TxMapper} from "../model/utils/tx-mapper.class";

@Injectable()
export class CsvFilesRestService {
  constructor(private _http: Http) {
  }

  getCsvLines(accountSetting: AccountSetting, rootPath?: string): Observable<any> {
    let url: string = "/restapi/csv/getlines?startsWith=" + accountSetting.fileStartsWith + "&headerLinesCount=" + accountSetting.headerLinesCount;
    if (rootPath) {
      url += "&rootPath=" + encodeURIComponent(rootPath);
    }
    return this._http.get(url).map(res => {
      return { account: accountSetting, csvLines: res.json() };
    });
  }

  getCsvNames(rootPath?: string) {
    let url: string = "/restapi/csv/getnames";
    if (rootPath) {
      url += "?rootPath=" + encodeURIComponent(rootPath);
    }
    return this._http.get(url).map(res => res.json());
  }

  deleteFile(fileName: string) {
    return this._http.delete("/restapi/csv/delete/" + fileName).map(res => res.json());
  }

  getDefaultCsvPath() {
    return this._http.get("/restapi/csv/defaultpath").map(res => res.json());
  }
}
