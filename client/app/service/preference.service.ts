import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {Preference} from '../model/core/preference.class'
import {PreferenceRestService} from './preference-rest.service'

@Injectable()
export class PreferenceService {
    constructor(private _preferenceRestService: PreferenceRestService) {
    }

    getPref(prefName:string): Observable<any> {
      return this._preferenceRestService.list().map(res => {
        let prefList:Array<Preference> = res.json();
        if (prefList.length > 0) {
          let preference: Preference = prefList[0];
          let foundKeys:string[] = Object.keys(preference).filter(key => key === prefName);
          if (foundKeys.length > 0) {
            return preference[foundKeys[0]];
          }
        }
        return undefined;
      });
    }

}
