import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class CsvReaderRestService {
    constructor(private _http: Http) {
    }

    list(rootPath:string, startsWith:string, headerLinesCount: number): Observable<any> {
      return this._http.get('/restapi/csvreader?rootPath=' + encodeURIComponent(rootPath)
        + "&startsWith=" + startsWith + "&headerLinesCount=" + headerLinesCount).map(res => res.json());
    }

}
