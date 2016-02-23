import {Component, OnInit} from 'angular2/core';
import 'rxjs/add/operator/map';

import {AccountSetting}             from '../../model/core/account-setting.class'
import {Tx}                         from '../../model/core/tx.class'
import {Category}                   from '../../model/core/category.class'
import {CatType, CatFrequency}      from '../../model/core/money-enums'
import {Txref}                      from '../../model/core/txref.class'
import {TxMapper}                   from '../../model/utils/tx-mapper.class'
import {TxFormData}                 from '../../model/formutil/tx-form-data.class'
import {PreferenceRestService}      from '../../service/preference-rest.service'
import {AccountSettingRestService}  from '../../service/account-setting-rest.service'
import {CategoryRestService}        from '../../service/category-rest.service'
import {CsvReaderRestService}       from '../../service/csv-reader-rest.service'
import {TxrefRestService}           from '../../service/txref-rest.service'
import {FormUtilsService}           from '../../service/form-utils.service'
import {CatfilterPipe}              from '../../pipe/money-pipes'

@Component({
  selector: 'money-import',
  templateUrl: 'html/import/index.html',
  directives: [],
  pipes: [CatfilterPipe]
})
export class ImportComponent implements OnInit {

  txFormDataList:Array<TxFormData> = [];
  refList:Array<string> = [];
  yearCategories:Array<Category>;
  months:Array<Object>;
  years:Array<number>;

  constructor(private _prefRestService: PreferenceRestService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvReaderRestService: CsvReaderRestService,
    private _txrefRestService: TxrefRestService,
    private _categoryRestService : CategoryRestService,
    private _formUtilsService: FormUtilsService) {
      this.months = this._formUtilsService.getAppMonths();
      this.years = this._formUtilsService.getAppYears();
  }

  ngOnInit() {
    this._prefRestService.getPref().subscribe(preference => {

      this._categoryRestService.listForYear(preference.workingYear).subscribe(categories => {
        this.yearCategories = categories;
      });

      this._accountSettingRestService.list().subscribe(accounts => {
        accounts.forEach(account => {
          this._csvReaderRestService.list(preference.csvPath, account).subscribe(csvLines => {

            let txList:Array<Tx> = csvLines.map(csvLine => TxMapper.mapLineToTx(csvLine, account));
            txList.sort((a:Tx, b:Tx) => {
              if (a.date > b.date) {
                return 1;
              } else if (a.date < b.date) {
                return -1;
              } else {
                return 0;
              }
            });
            txList.forEach(tx => {
              this._txrefRestService.readByRef(tx.ref).subscribe(foundRef => {
                if (!foundRef && this.refList.indexOf(tx.ref) == -1 && this.txFormDataList.length < 10) {
                  this.txFormDataList.push(new TxFormData(tx));
                  this.refList.push(tx.ref);
                }
              });
            });
          });
        })
      })
    });
  }

  catTypeChanged($event, txFormData) {
    txFormData.categoryType = CatType[<string>$event.target.value];
  }

  catFrequencyChanged($event, txFormData) {
    txFormData.categoryFrequency = CatFrequency[<string>$event.target.value];
  }

  comptaDateChanged($event, txFormData) {
    if ($event.target.checked) {
      txFormData.comptaDate = true;
    } else {
      txFormData.resetComptaDate();
    }
  }

  saveAllTx() {
    for (let txFormData of this.txFormDataList) {
      if (txFormData.categoryLink.categoryId) {
        let comptaDate: Date;
        if (txFormData.comptaDate) {
          comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
        } else {
          comptaDate = txFormData.tx.date;
        }
        txFormData.categoryLink.categoryYear = comptaDate.getFullYear();
        (function(comp: ImportComponent, inComptaDate: Date, txFormData: TxFormData) {
          comp._categoryRestService.existsCategoryForYear(txFormData.categoryLink.categoryId, inComptaDate.getFullYear()).subscribe(category => {
            if (category) {
              if (category.frequency == CatFrequency.MONTHLY) {
                txFormData.categoryLink.periodIndex = inComptaDate.getMonth();
              } else if (category.frequency == CatFrequency.QUARTER) {
                txFormData.categoryLink.periodIndex = Math.floor((inComptaDate.getMonth() + 3) / 3) - 1;
              } else if (category.frequency == CatFrequency.YEARLY) {
                txFormData.categoryLink.periodIndex = 0;
              }
              comp._txrefRestService.create(new Txref(txFormData.tx.ref)).subscribe(txrefAdded => {
                console.log("Added tx ref");
              });
              comp._categoryRestService.addTx(txFormData).subscribe(txAdded => {
                console.log("Added tx");
              });
            }
          });
        })(this, comptaDate, txFormData);
      }
    }
  }
}
