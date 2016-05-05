import {Control} from "@angular/common";
import {AdminRuleComponent} from "../../comp/admin/admin-rule.component";
import {CondFieldType, CondOperator}  from "../../model/core/money-enums";

export class RuleConditionValidator {
  public validate: (control: Control) => Object;

  constructor(component: AdminRuleComponent) {
    let validator = this;
    validator.validate = (control: Control) => {
      return validator.validateConditions(component);
    };
  }

  validateConditions(component: AdminRuleComponent): Object {

    let valid = true;
    for (let condition of component.newRule.conditions) {
      if (!condition.fieldName || !condition.fieldType || !condition.operator) {
        valid = false;
      } else {
        switch (condition.fieldType) {
          case CondFieldType.STRING:
            if (!condition.valueStr) {
              valid = false;
            }
            break;
          case CondFieldType.NUMBER:
            if (!condition.valueNum) {
              valid = false;
            }
            break;
        }
      }
    }

    if (valid) {
      return null;
    } else {
      return {"wrongConditions": true};
    }
  }
}
