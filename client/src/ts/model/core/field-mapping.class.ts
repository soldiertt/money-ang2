export class FieldMapping {
  value: string;
  index: number;
  isDateDMY: boolean;
  isDateYMD: boolean;
  isBelgianNumber: boolean;

  constructor(value: string, index: number) {
    this.value = value;
    this.index = index;
    this.isDateDMY = false;
    this.isDateYMD = false;
    // set default value, true will be set at validation time and comma will be ignored, improvement is to manage us format.
    this.isBelgianNumber = false;
  }

}
