import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import {Category} from '../model/core/category.class'

@Injectable()
export class CategoryRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/category');
    }

    create(newCateg: Category): Observable<any> {
      return this._http.post('/restapi/category', JSON.stringify(newCateg));
    }

    delete(categId: String): Observable<any> {
      return this._http.delete('/restapi/category/' + categId);
    }
}
