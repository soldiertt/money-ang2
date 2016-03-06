import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {Rule} from '../model/core/rule.class'

@Injectable()
export class RuleRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/rule').map(res => res.json());
    }

    create(rule: Rule): Observable<any> {
      return this._http.post('/restapi/rule', JSON.stringify(rule)).map(res => res.json());
    }

    delete(ruleId: string): Observable<any> {
      return this._http.delete('/restapi/rule/' + ruleId);
    }

    update(rule: Rule): Observable<any> {
      return this._http.put('/restapi/rule/' + rule.id, JSON.stringify(rule));
    }
}
