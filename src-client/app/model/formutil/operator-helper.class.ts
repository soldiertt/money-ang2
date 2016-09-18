import {CondOperator}  from "../core/money-enums";

export class OperatorHelper {
  operator: CondOperator;
  label: string;
  constructor(operator: CondOperator, label: string) {
    this.operator = operator;
    this.label = label;
  }
}
