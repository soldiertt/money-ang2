import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

import {AccountSetting} from '../model/core/account-setting.class'

@Injectable()
export class AccountSettingRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/account-setting');
    }

    create(newAccountSetting: AccountSetting): Observable<any> {
      return this._http.post('/restapi/account-setting', JSON.stringify(newAccountSetting));
    }

    delete(accountSettingId: String): Observable<any> {
      return this._http.delete('/restapi/account-setting/' + accountSettingId);
    }
}
