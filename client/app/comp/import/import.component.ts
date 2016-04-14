import {Component, OnInit} from "angular2/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import {AccountSetting}                     from "../../model/core/account-setting.class";
import {Tx}                                 from "../../model/core/tx.class";
import {Category}                           from "../../model/core/category.class";
import {CatType, CatFrequency}              from "../../model/core/money-enums";
import {Txref}                              from "../../model/core/txref.class";
import {TxMapper}                           from "../../model/utils/tx-mapper.class";
import {TxFormData}                         from "../../model/formutil/tx-form-data.class";
import {PreferenceRestService}              from "../../service/preference-rest.service";
import {AccountSettingRestService}          from "../../service/account-setting-rest.service";
import {CategoryRestService}                from "../../service/category-rest.service";
import {CsvFilesRestService}               from "../../service/csv-files-rest.service";
import {TxrefRestService}                   from "../../service/txref-rest.service";
import {RuleService}                        from "../../service/rule.service";
import {FormUtilsService}                   from "../../service/form-utils.service";
import {CatfilterPipe, CategorySorterPipe}  from "../../pipe/money-pipes";


@Component({
  selector: "money-import",
  templateUrl: "html/import/index.html",
  styleUrls: ["css/import.css"],
  pipes: [CatfilterPipe, CategorySorterPipe]
})
export class ImportComponent implements OnInit {

  txFormDataList: Array<TxFormData> = [];
  pendingTxList: Array<Tx> = [];
  allCategories: Array<Category>;
  months: Array<Object>;
  years: Array<number>;

  constructor(private _prefRestService: PreferenceRestService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvFilesRestService: CsvFilesRestService,
    private _txrefRestService: TxrefRestService,
    private _categoryRestService: CategoryRestService,
    private _formUtilsService: FormUtilsService,
    private _ruleService: RuleService) {
      this.months = this._formUtilsService.getAppMonths();
      this.years = this._formUtilsService.getAppYears();
  }

  ngOnInit() {

    this._categoryRestService.list().subscribe(categories => {
      this.allCategories = categories;
    });

    this._prefRestService.getPref().subscribe(preference => {

      this._accountSettingRestService.list().subscribe(accounts => {

        let readLinesJobs: Array<Observable<any>> = [];
        accounts.forEach(account => {
          if (preference.useDefaultCsvPath) {
            readLinesJobs.push(this._csvFilesRestService.getCsvLines(account));
          } else {
            readLinesJobs.push(this._csvFilesRestService.getCsvLines(account, preference.csvPath));
          }
        });
        Observable.forkJoin(readLinesJobs).subscribe(linesByAccountArray => {
          linesByAccountArray.forEach(linesByAccount => {
            this.pendingTxList = this.pendingTxList.concat(linesByAccount.csvLines.map(csvLine => TxMapper.mapLineToTx(csvLine, linesByAccount.account)));
          });
          this.reducePendingTxList();
        });
      });
    });
  }

  reducePendingTxList() {
    // 1. Remove duplicates Tx with identical refs (e.a. same tx exported twice)
    this.pendingTxList = this.pendingTxList.reduce((reduced, tx) => {
      if (!reduced.some(tx2 => { return tx2.ref === tx.ref; })) {
         reduced.push(tx);
      }
      return reduced;
    }, []);

    // 2. sort list by date
    this.pendingTxList.sort((a: Tx, b: Tx) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    });

    // 3. Check if Tx already in DB
    this._txrefRestService.readByRefs(this.pendingTxList).subscribe(foundRefs => {
      this.pendingTxList = this.pendingTxList.filter(tx => foundRefs.indexOf(tx.ref) === -1);
      this.populateTxToDisplay();
    });
  }

  populateTxToDisplay() {
    this.pendingTxList = this.pendingTxList.filter(tx => {
      if (this.txFormDataList.length < 10) {
        let txFormData = this._ruleService.applyRules(tx, true);
        this.txFormDataList.push(txFormData);
        return false;
      } else {
        return true;
      }
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

  getTxYear(txFormData: TxFormData): number {
    if (txFormData.comptaDate) {
      return txFormData.comptaYear;
    } else {
      return txFormData.tx.date.getFullYear();
    }
  }

  saveAllTx() {
    let toSaveList: Array<TxFormData> = this.txFormDataList.filter(txFormData => { if (txFormData.categoryLink.categoryId) { return true; } else { return false; } });
    toSaveList.forEach(txFormData => {

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
            if (category.frequency === CatFrequency.MONTHLY) {
              txFormData.categoryLink.periodIndex = inComptaDate.getMonth();
            } else if (category.frequency === CatFrequency.QUARTER) {
              txFormData.categoryLink.periodIndex = Math.floor((inComptaDate.getMonth() + 3) / 3) - 1;
            } else if (category.frequency === CatFrequency.YEARLY) {
              txFormData.categoryLink.periodIndex = 0;
            }
            comp._txrefRestService.create(new Txref(txFormData.tx.ref)).subscribe(txrefAdded => {
              console.log("Added tx ref");
            });
            comp._categoryRestService.addTx(txFormData).subscribe(txAdded => {
              console.log("Added tx");
            });
          } else {
            console.error("Error adding tx with ref ", txFormData.tx.ref, "category", txFormData.categoryLink.categoryId, "not available for year", inComptaDate.getFullYear());
          }
        });
      })(this, comptaDate, txFormData);

    });
    this.txFormDataList = this.txFormDataList.filter(txFormData => { if (txFormData.categoryLink.categoryId) { return false; } else { return true; }; });
    this.populateTxToDisplay();
  }
}
