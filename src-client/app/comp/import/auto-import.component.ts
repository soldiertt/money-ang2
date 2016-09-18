import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import {Tx}                                 from "../../model/core/tx.class";
import {CatFrequency}                       from "../../model/core/money-enums";
import {Txref}                              from "../../model/core/txref.class";
import {TxMapper}                           from "../../model/utils/tx-mapper.class";
import {TxFormData}                         from "../../model/formutil/tx-form-data.class";
import {PreferenceRestService}              from "../../service/preference-rest.service";
import {AccountSettingRestService}          from "../../service/account-setting-rest.service";
import {CategoryRestService}                from "../../service/category-rest.service";
import {CsvFilesRestService}               from "../../service/csv-files-rest.service";
import {TxrefRestService}                   from "../../service/txref-rest.service";
import {RuleService}                        from "../../service/rule.service";

class LogLine {
  content: string;
  className: string;
  constructor(content: string, className: string) {
    this.content = content;
    this.className = className;
  }
}

@Component({
  selector: "money-auto-import",
  templateUrl: "app/comp/import/auto-import.html",
  styleUrls: ["app/comp/import/import.css"]
})
export class AutoImportComponent implements OnInit {

  txFormDataList: Array<TxFormData> = [];
  pendingTxList: Array<Tx> = [];
  importLog: Array<LogLine> = [];

  constructor(private _prefRestService: PreferenceRestService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvFilesRestService: CsvFilesRestService,
    private _txrefRestService: TxrefRestService,
    private _categoryRestService: CategoryRestService,
    private _ruleService: RuleService) {

  }

  ngOnInit() {

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
    });
  }

  runAutoImport() {
    this.pendingTxList.forEach(tx => {
      let txFormData = this._ruleService.applyRules(tx);
      if (txFormData.categoryLink.categoryId) {
        this.saveTx(txFormData);
      } else {
        console.log("No rule match tx", tx);
      }
    });
  }

  saveTx(txFormData: TxFormData) {
    let comptaDate = txFormData.tx.date;
    txFormData.categoryLink.categoryYear = comptaDate.getFullYear();
    (function(comp: AutoImportComponent, inComptaDate: Date, txFormData: TxFormData) {
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
            comp.importLog.push(new LogLine("Rule " + txFormData.appliedRule + " applied to tx " + JSON.stringify(txFormData.tx), "info"));
          });
        } else {
          comp.importLog.push(new LogLine("Missing category for year " + inComptaDate.getFullYear() + " for tx " + JSON.stringify(txFormData.tx), "warn"));
        }
      });
    })(this, comptaDate, txFormData);

  }
}
