import {FieldMapping} from './field-mapping.class'

export class AccountSetting {
  id: string;
  name:string;
  fileStartsWith:string;
  accountNumber:string;
  headerLinesCount: number;
  fieldSeparator:string;
  fieldMappings: Array<FieldMapping>;

  constructor() {
    this.headerLinesCount = 0;
    this.fieldSeparator = ";";
    this.fieldMappings = [];
  }

}
