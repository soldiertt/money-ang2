import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import {FilterPreset} from '../model/core/filter-preset.class'

@Injectable()
export class FilterPresetRestService {
  constructor(private _http: Http) {
  }

  list(): Observable<any> {
    return this._http.get('/restapi/filterpreset').map(res => res.json());
  }

  create(filterPreset: FilterPreset): Observable<any> {
    return this._http.post('/restapi/filterpreset', JSON.stringify(filterPreset)).map(res => res.json());
  }

  update(filterPreset: FilterPreset): Observable<any> {
    return this._http.put('/restapi/filterpreset/' + filterPreset.id, JSON.stringify(filterPreset));
  }

  delete(presetId: String): Observable<any> {
    return this._http.delete('/restapi/filterpreset/' + presetId);
  }
}
