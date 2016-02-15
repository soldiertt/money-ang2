import {Component, OnInit} from 'angular2/core';
import 'rxjs/add/operator/map';

import {AccountSetting} from '../../model/core/account-setting.class'
import {Tx} from '../../model/core/tx.class'
import {Category} from '../../model/core/category.class'
import {TxMapper} from '../../model/utils/tx-mapper.class'
import {PreferenceRestService} from '../../service/preference-rest.service'
import {AccountSettingRestService} from '../../service/account-setting-rest.service'
import {CategoryRestService} from '../../service/category-rest.service'
import {CsvReaderRestService} from '../../service/csv-reader-rest.service'
import {TxrefRestService} from '../../service/txref-rest.service'
import {CatType} from '../../model/core/category-type.enum'
import {CatFrequency} from '../../model/core/category-frequency.enum'
import {TxFormData} from '../../model/formutil/tx-form-data.class'
import {Txref} from '../../model/core/txref.class'
import {CatfilterPipe} from '../../pipe/catfilter-pipe'

@Component({
  selector: 'money-import',
  templateUrl: 'app/view/import/index.html',
  directives: [],
  pipes: [CatfilterPipe]
})

export class ImportComponent implements OnInit {

  txFormDataList:Array<TxFormData> = [];
  refList:Array<string> = [];
  yearCategories:Array<Category>;

  months:Array<Object> = [{value:0, name:"January"},{value:1, name:"February"},{value:2, name:"March"},
    {value:3, name:"April"},{value:4, name:"May"},{value:5, name:"June"},
    {value:6, name:"July"},{value:7, name:"Augustus"},{value:8, name:"September"},
    {value:9, name:"October"},{value:10, name:"November"},{value:11, name:"December"}];
  years:Array<number> = [2014, 2015, 2016];

  constructor(private _prefRestService: PreferenceRestService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvReaderRestService: CsvReaderRestService,
    private _txrefRestService: TxrefRestService,
    private _categoryRestService : CategoryRestService) {
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
        let comptaYear:number = comptaDate.getFullYear();
        txFormData.categoryLink.categoryYear = comptaYear;
        (function(comp: ImportComponent, inComptaDate: Date, txFormData: TxFormData) {
          comp._categoryRestService.existsCategoryForYear(txFormData.categoryLink.categoryId, comptaYear).subscribe(category => {
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
                console.log("Added tx", txAdded);
              });
            }
          });
        })(this, comptaDate, txFormData);
      }
    }
  }
}
