import {Component} from 'angular2/core';

import {AccountSetting} from '../../model/core/account-setting.class'
import {Tx} from '../../model/core/tx.class'
import {TxMapper} from '../../model/utils/tx-mapper.class'
import {PreferenceService} from '../../service/preference.service'
import {AccountSettingRestService} from '../../service/account-setting-rest.service'
import {CsvReaderRestService} from '../../service/csv-reader-rest.service'
import {TxRestService} from '../../service/tx-rest.service'

@Component({
  selector: 'money-import',
  templateUrl: 'app/view/import/index.html',
  directives: []
})

export class ImportComponent {

  pendingTxList:Array<Tx> = [];
  pendingRefList:Array<string> = [];

  constructor(private _prefService: PreferenceService,
    private _accountSettingRestService: AccountSettingRestService,
    private _csvReaderRestService: CsvReaderRestService,
    private _txRestService: TxRestService) {

    this._prefService.getPref("csvPath").subscribe(csvPath => {
      this._accountSettingRestService.list().subscribe(accounts => {
        accounts.forEach(account => {
          this._csvReaderRestService.list(csvPath, account.fileStartsWith, account.headerLinesCount).subscribe(csvLines => {
            csvLines.forEach(csvLine => {
              let tx = TxMapper.mapLineToTx(csvLine, account);
              this._txRestService.readByRef(tx.ref).subscribe(foundTx => {
                if (!foundTx && this.pendingRefList.indexOf(tx.ref) == -1) {
                  this.pendingTxList.push(tx);
                  this.pendingRefList.push(tx.ref);
                }
              });
            })
          });
        })
      })
    });
  }
}
