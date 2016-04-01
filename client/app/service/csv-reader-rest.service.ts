import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import {AccountSetting} from '../model/core/account-setting.class'
import {TxMapper} from '../model/utils/tx-mapper.class'

@Injectable()
export class CsvReaderRestService {
    constructor(private _http: Http) {
    }

    list(rootPath:string, accountSetting: AccountSetting): Observable<any> {
      return this._http.get('/restapi/csvreader?rootPath=' + encodeURIComponent(rootPath)
        + "&startsWith=" + accountSetting.fileStartsWith + "&headerLinesCount=" + accountSetting.headerLinesCount)
        .map(res => {
          return { account: accountSetting, csvLines: res.json() };
        });
    }

}
