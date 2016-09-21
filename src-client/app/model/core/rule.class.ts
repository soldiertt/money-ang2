import {CondOperator, CondFieldType} from "./money-enums";
import {Category}         from "./category.class";

export class Condition {
  id: string;
  fieldName: string;
  fieldType: CondFieldType;
  operator: CondOperator;
  valueStr: string;
  valueNum: number;

  constructor() {
  }

}

export class Rule {
  id: string;
  name: string;
  conditions: Array<Condition>;
  categoryId: string; // must match mongoose model
  category: Category; // returned by populated field, not saved in DB
  isActive: boolean;

  constructor() {
    this.conditions = [new Condition()];
    this.isActive = true;
    this.category = new Category(null, null, null, []);
  }
}
