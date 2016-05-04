import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import {Tx} from "../model/core/tx.class";
import {Txref} from "../model/core/txref.class";

@Injectable()
export class TxrefRestService {
    constructor(private _http: Http) {
    }

    readByRefs(txList: Array<Tx>): Observable<any> {
      let txRefsParam = "";
      txList.forEach(tx => {
        txRefsParam += "&txref=" + tx.ref;
      });
      return this._http.get("/restapi/txref/find?" + txRefsParam.substr(1, txRefsParam.length - 1))
        .map(res => res.json())
        .map(res => res.map(txref => txref.ref));
    }

    create(txRef: Txref): Observable<any> {
      return this._http.post("/restapi/txref", JSON.stringify(txRef));
    }

    deleteByTxref(txref: string): Observable<any> {
      return this._http.delete("/restapi/txref/" + txref);
    }
}
