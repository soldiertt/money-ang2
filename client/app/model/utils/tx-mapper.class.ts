import {Tx} from '../core/tx.class'
import {AccountSetting} from '../core/account-setting.class'

export class TxMapper {

  public static mapLineToTx(csvLine:string, setting: AccountSetting): Tx {
    let tokens:Array<string> = csvLine.split(setting.fieldSeparator);
    let outTx: Tx = new Tx();
    outTx.ownAccount.name = setting.name;
    outTx.ownAccount.name = setting.accountNumber;
    
    setting.fieldMappings.forEach(function(mapping) {
      switch (mapping.value) {
        case 'id':
          outTx.ref = tokens[mapping.index];
          break;
        case 'amount':
          if (mapping.isBelgianNumber) {
            let amountStr = tokens[mapping.index].replace(/[.]/g, '').replace(/,/g, '.');
            outTx.amount = Number(amountStr);
          }
          break;
        case 'communication':
          outTx.communication = tokens[mapping.index];
          break;
        case 'date':
          let dateStr = tokens[mapping.index];
          let parms = dateStr.split(/[\.\-\/]/);
          let yyyy, mm, dd;
          if (mapping.isDateDMY) {
            yyyy = parseInt(parms[2],10);
            mm   = parseInt(parms[1],10);
            dd   = parseInt(parms[0],10);
          } else if (mapping.isDateYMD) {
            yyyy = parseInt(parms[0],10);
            mm   = parseInt(parms[1],10);
            dd   = parseInt(parms[2],10);
          }
          outTx.date = new Date(yyyy,mm-1,dd,0,0,0,0);
          break;
        case 'description':
          outTx.comment = tokens[mapping.index];
          break;
        case 'third-party-account-name':
          outTx.thirdPartyAccount.name = tokens[mapping.index];
          break;
        case 'third-party-account-number':
          outTx.thirdPartyAccount.number = tokens[mapping.index];
          break;
      }
    });
    return outTx;
  }
}
