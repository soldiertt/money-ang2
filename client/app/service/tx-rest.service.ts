import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {Tx} from '../model/core/tx.class'

@Injectable()
export class TxRestService {
    constructor(private _http: Http) {
    }

    readByRef(txRef: string) {
      return this._http.get('/restapi/tx/ref/' + txRef).map(res => res.json());
    }

    list(): Observable<any> {
      return this._http.get('/restapi/tx');
    }

    create(newTx: Tx): Observable<any> {
      return this._http.post('/restapi/tx', JSON.stringify(newTx));
    }

    update(newTx: Tx): Observable<any> {
      return this._http.put('/restapi/tx/' + newTx.id, JSON.stringify(newTx));
    }
}
