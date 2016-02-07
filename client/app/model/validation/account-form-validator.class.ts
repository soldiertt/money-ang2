import {Control} from 'angular2/common'
import {AdminCsvComponent} from '../../comp/admin/admincsv.component'

export class AccountFormValidator {
  public validate: (control: Control) => Object;

  constructor(component: AdminCsvComponent) {

    this.validate = (control: Control) => {
      let amount:number = 0;
      let comm:number = 0;
      let date:number = 0;
      let desc:number = 0;
      let id:number = 0;
      let ownAccountName:number = 0;
      let ownAccountNumber:number = 0;
      let thirdPartyAccountName: number = 0;
      let thirdPartyAccountNumber: number = 0;
      let mappingOk: boolean = true;

      for (let mapper of component.accountSetting.fieldMappings) {
        switch(mapper.value) {
          case "ignore" :
            break;
          case "amount":
            amount++;
            break;
          case "communication":
            comm++;
            break;
          case "date":
            date++;
            break;
          case "description":
            desc++;
            break;
          case "id":
            id++;
            break;
          case "own-account-name":
            ownAccountName++;
            break;
          case "own-account-number":
            ownAccountNumber++;
            break;
          case "third-party-account-name":
            thirdPartyAccountName++;
            break;
          case "third-party-account-number":
            thirdPartyAccountNumber++;
            break;
        }
      }
      if (amount != 1 || comm != 1 || date != 1 || desc > 1 || id !=1 || ownAccountName > 1
        || ownAccountNumber > 1 || thirdPartyAccountName != 1 || thirdPartyAccountNumber != 1) {
        mappingOk = false;
      }
      if (mappingOk) {
        return null;
      } else {
        return {"wrongMapping": true};
      }
    }
  }

  isValidNumber(control: Control) {
    if (!isNaN(control.value)) {
      return null;
    } else {
      return {wrongNumber : true};
    }
  }
}
