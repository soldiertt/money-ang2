import {Component} from 'angular2/core';

import {AccountSetting} from '../../model/core/account-setting.class'
import {Tx} from '../../model/core/tx.class'
import {Category} from '../../model/core/category.class'
import {TxMapper} from '../../model/utils/tx-mapper.class'
import {PreferenceRestService} from '../../service/preference-rest.service'
import {AccountSettingRestService} from '../../service/account-setting-rest.service'
import {CategoryRestService} from '../../service/category-rest.service'
import {CsvReaderRestService} from '../../service/csv-reader-rest.service'
import {TxRestService} from '../../service/tx-rest.service'
import {CatType} from '../../model/core/category-type.enum'
import {CatFrequency} from '../../model/core/category-frequency.enum'
import {TxFormData} from '../../model/formutil/tx-form-data.class'
import {CatfilterPipe} from '../../pipe/catfilter-pipe'
import {TxSorterPipe} from '../../pipe/tx-sorter-pipe'

@Component({
  selector: 'money-import',
  templateUrl: 'app/view/import/index.html',
  directives: [],
  pipes: [CatfilterPipe, TxSorterPipe]
})

export class ImportComponent {

  pendingTxList:Array<Tx> = [];
  pendingRefList:Array<string> = [];
  yearCategories:Array<Category>;
  txFormDataMap:Map<string, TxFormData> = new Map<string, TxFormData>();

  months:Array<Object> = [{value:0, name:"January"},{value:1, name:"February"},{value:2, name:"March"},
    {value:3, name:"April"},{value:4, name:"May"},{value:5, name:"June"},
    {value:6, name:"July"},{value:7, name:"Augustus"},{value:8, name:"September"},
    {value:9, name:"October"},{value:10, name:"November"},{value:11, name:"December"}];
  years:Array<number> = [2014, 2015, 2016];

  constructor(private _prefRestService: PreferenceRestService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvReaderRestService: CsvReaderRestService,
    private _txRestService: TxRestService,
    private _categoryRestService : CategoryRestService) {

    this._prefRestService.getPref().subscribe(preference => {

      this._categoryRestService.listForYear(preference.workingYear).subscribe(categories => {
        this.yearCategories = categories;
      });

      this._accountSettingRestService.list().subscribe(accounts => {
        accounts.forEach(account => {
          this._csvReaderRestService.list(preference.csvPath, account.fileStartsWith, account.headerLinesCount).subscribe(csvLines => {
            csvLines.forEach(csvLine => {
              let tx = TxMapper.mapLineToTx(csvLine, account);
              this._txRestService.readByRef(tx.ref).subscribe(foundTx => {
                if (!foundTx && this.pendingRefList.indexOf(tx.ref) == -1) {
                  this.pendingTxList.push(tx);
                  this.pendingTxList = this.pendingTxList.slice(0); //Hack to force change detection
                  this.pendingRefList.push(tx.ref);
                  this.txFormDataMap.set(tx.ref, new TxFormData(tx.amount));
                }
              });
            });
          });
        })
      })
    });
  }

  catTypeChanged($event, ref) {
    this.txFormDataMap.get(ref).categoryType = CatType[<string>$event.target.value];
  }

  catFrequencyChanged($event, ref) {
    this.txFormDataMap.get(ref).categoryFrequency = CatFrequency[<string>$event.target.value];
  }

  comptaDateChanged($event, ref) {
    let txFormData = this.txFormDataMap.get(ref);
    if ($event.target.checked) {
      txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
    } else {
      txFormData.resetComptaDate();
    }
  }

  comptaMonthChanged($event, ref) {
    let txFormData = this.txFormDataMap.get(ref);
    txFormData.comptaMonth = $event.target.value;
    txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
  }

  comptaYearChanged($event, ref) {
    let txFormData = this.txFormDataMap.get(ref);
    txFormData.comptaYear = $event.target.value;
    txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
  }

  display() {
    console.log(this.txFormDataMap);
  }
}
