import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import {Preference} from '../model/core/preference.class'

@Injectable()
export class PreferenceRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/preference');
    }

    getPref(): Observable<any> {
      return this.list().map(res => {
        let prefList:Array<Preference> = res.json();
        if (prefList.length > 0) {
          /*let preference: Preference = prefList[0];
          let foundKeys:string[] = Object.keys(preference).filter(key => key === prefName);
          if (foundKeys.length > 0) {
            return preference[foundKeys[0]];
          }*/
          return prefList[0];
        }
        return undefined;
      });
    }

    create(newPreference: Preference): Observable<any> {
      return this._http.post('/restapi/preference', JSON.stringify(newPreference));
    }

    update(newPreference: Preference): Observable<any> {
      return this._http.put('/restapi/preference/' + newPreference.id, JSON.stringify(newPreference));
    }
}
