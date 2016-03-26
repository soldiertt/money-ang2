import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {Category} from '../model/core/category.class'
import {Tx} from '../model/core/tx.class'
import {TxFormData} from '../model/formutil/tx-form-data.class'

@Injectable()
export class CategoryRestService {
    constructor(private _http: Http) {
    }

    list(): Observable<any> {
      return this._http.get('/restapi/category').map(res => res.json());
    }

    listForYear(year: number): Observable<any> {
      return this._http.get('/restapi/category/search?year=' + year).map(res => res.json());
    }

    existsCategoryForYear(categoryId:string, year: number): Observable<any> {
      return this._http.get('/restapi/category/search?id=' + categoryId  + '&year=' + year).map(res => {
        if (res) {
          return res.json();
        } else {
          return undefined;
        }
      });
    }

    create(newCateg: Category): Observable<any> {
      return this._http.post('/restapi/category', JSON.stringify(newCateg));
    }

    update(categ: Category): Observable<any> {
      return this._http.put('/restapi/category/' + categ.id, JSON.stringify(categ));
    }

    updatePeriodMarkAsPaid(categId: string, periodId: string, markAsPaid: boolean): Observable<any> {
      let updateData = {'categoryId': categId, 'periodId': periodId, 'markAsPaid': markAsPaid};
      return this._http.put('/restapi/category/period/markAsPaid', JSON.stringify(updateData)).map(res => res.json());
    }

    delete(categId: string): Observable<any> {
      return this._http.delete('/restapi/category/' + categId);
    }

    addTx(txFormData: TxFormData): Observable<any> {
      return this._http.post('/restapi/category/addtx', JSON.stringify(txFormData));
    }

    removeTx(periodId: string, tx: Tx): Observable<any> {
      return this._http.post('/restapi/category/removetx/' + periodId , JSON.stringify(tx));
    }

    existsTxForYears(categoryId: string, years: Array<number>) {
      let yearsParam = "";
      years.forEach(year => {
        yearsParam += "&years=" + year;
      });
      return this._http.get('/restapi/tx/search?categoryId=' + categoryId  + yearsParam).map(res => {
        if (res.json()) {
          return true;
        } else {
          return false;
        }
      });
    }

    findAllTxForPeriod(categoryId: string, periodId: string) {
      return this._http.get('/restapi/tx/search?categoryId=' + categoryId + "&periodId=" + periodId)
        .map(res => res.json());
    }
}
