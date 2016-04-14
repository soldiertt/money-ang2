import {FieldMapping} from "./field-mapping.class";

export class AccountSetting {
  id: string;
  name: string;
  fileStartsWith: string;
  accountNumber: string;
  headerLinesCount: number;
  fieldSeparator: string;
  fieldMappings: Array<FieldMapping>;
  generateIdentifier: boolean;

  constructor() {
    this.headerLinesCount = 0;
    this.fieldSeparator = ";";
    this.fieldMappings = [];
    this.generateIdentifier = false;
  }

}
