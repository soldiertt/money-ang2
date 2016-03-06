import {CondOperator, CondFieldType} from './money-enums'
import {Category}         from './category.class';
import {OperatorHelper}   from '../formutil/operator-helper.class'

export class Condition {
  id: string;
  fieldName: string;
  fieldType: CondFieldType;
  availableOperators: Array<OperatorHelper>; //Not saved in DB
  operator: CondOperator;
  valueStr: string;
  valueNum: number;

  constructor() {
    this.availableOperators = [];
  }

}

export class Rule {
  id: string;
  name: string;
  conditions: Array<Condition>;
  category: string; //Category id
  isActive: boolean;

  constructor() {
    this.conditions = [new Condition()];
    this.isActive = true;
  }
}
