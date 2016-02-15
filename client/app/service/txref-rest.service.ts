import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {Txref} from '../model/core/txref.class'

@Injectable()
export class TxrefRestService {
    constructor(private _http: Http) {
    }

    readByRef(txRef: string) {
      return this._http.get('/restapi/txref/ref/' + txRef).map(res => res.json());
    }

    create(txRef: Txref): Observable<any> {
      return this._http.post('/restapi/txref', JSON.stringify(txRef));
    }

}
