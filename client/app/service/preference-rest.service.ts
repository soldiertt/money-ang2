import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

import {Preference} from '../model/core/preference.class'

@Injectable()
export class PreferenceRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/preference');
    }

    create(newPreference: Preference): Observable<any> {
      return this._http.post('/restapi/preference', JSON.stringify(newPreference));
    }

    delete(preferenceId: String): Observable<any> {
      return this._http.delete('/restapi/preference/' + preferenceId);
    }
}
