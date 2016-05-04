import {Control} from "@angular/common";
import {AdminAccountSettingComponent} from "../../comp/admin/admin-account-setting.component";
import {FieldMapping} from "../core/field-mapping.class";

export class AccountFormValidator {
  public validate: (control: Control) => Object;

  constructor(component: AdminAccountSettingComponent) {
    let validator = this;
    validator.validate = (control: Control) => {
      return validator.validateMapping(component);
    };
  }

  validateMapping(component: AdminAccountSettingComponent): Object {
    let amount: number = 0;
    let comm: number = 0;
    let date: number = 0;
    let desc: number = 0;
    let id: number = 0;
    let thirdPartyAccountName: number = 0;
    let thirdPartyAccountNumber: number = 0;
    let mappingOk: boolean = true;

    for (let mapper of component.accountSetting.fieldMappings) {
      switch (mapper.value) {
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
        case "third-party-account-name":
          thirdPartyAccountName++;
          break;
        case "third-party-account-number":
          thirdPartyAccountNumber++;
          break;
      }
    }
    if (amount !== 1 || comm !== 1 || date !== 1 || desc > 1
      || id > 1
      || (id !== 1 && !component.accountSetting.generateIdentifier)
      || (id === 1 && component.accountSetting.generateIdentifier)
      || thirdPartyAccountName !== 1 || thirdPartyAccountNumber !== 1) {
      mappingOk = false;
    }
    if (mappingOk) {
      if (this.validTxDate(component)) {
        if (this.validAmount(component)) {
          return null;
        } else {
          return {"wrongMapping": true};
        }
      } else {
        return {"wrongMapping": true};
      }
    } else {
      return {"wrongMapping": true};
    }
  }

  validTxDate(component: AdminAccountSettingComponent): boolean {
    let mapping: FieldMapping;
    for (let mapper of component.accountSetting.fieldMappings) {
      if (mapper.value === "date") {
        mapping = mapper;
      }
    }
    let dateStr: string = component.lineTokens[mapping.index];
    if (this.isDateDMY(dateStr)) {
      mapping.isDateDMY = true;
    }
    if (this.isDateYMD(dateStr)) {
      mapping.isDateYMD = true;
    }
    return mapping.isDateDMY || mapping.isDateYMD;
  }

  validAmount(component: AdminAccountSettingComponent): boolean {
    let mapping: FieldMapping;
    for (let mapper of component.accountSetting.fieldMappings) {
      if (mapper.value === "amount") {
        mapping = mapper;
      }
    }
    let amountStr: string = component.lineTokens[mapping.index];
    amountStr = amountStr.replace(/[.]/g, "").replace(/,/g, ".");
    if (!isNaN(Number(amountStr))) {
      mapping.isBelgianNumber = true;
    }
    return mapping.isBelgianNumber;
  }

  isDateDMY(str) {
    let parms = str.split(/[\.\-\/]/);
    let yyyy = parseInt(parms[2], 10);
    let mm   = parseInt(parms[1], 10);
    let dd   = parseInt(parms[0], 10);
    let date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
  }

  isDateYMD(str) {
    let parms = str.split(/[\.\-\/]/);
    let yyyy = parseInt(parms[0], 10);
    let mm   = parseInt(parms[1], 10);
    let dd   = parseInt(parms[2], 10);
    let date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
  }

  isValidNumber(control: Control) {
    if (!isNaN(control.value)) {
      return null;
    } else {
      return {wrongNumber : true};
    }
  }
}
