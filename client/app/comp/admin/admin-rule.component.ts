import {Component, ElementRef} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Condition, Rule}              from '../../model/core/rule.class'
import {Category}                     from '../../model/core/category.class'
import {OperatorHelper}               from '../../model/formutil/operator-helper.class'
import {CondFieldType, CondOperator, CatType, CatFrequency}  from '../../model/core/money-enums'
import {RuleConditionValidator}       from '../../model/validation/rule-condition-validator.class'
import {RuleRestService}              from '../../service/rule-rest.service'
import {CategoryRestService}          from '../../service/category-rest.service'
import {DisplayErrorDirective}        from '../directive/display-error.directive'
import {CatfilterPipe, CategorySorterPipe}  from '../../pipe/money-pipes'
//import {TOOLTIP_DIRECTIVES}           from 'ng2-bootstrap/ng2-bootstrap';

class FieldHelper {
  index: number;
  name: string;
  label:string;
  type:CondFieldType;
  constructor(index: number, name:string, label:string, type: CondFieldType) {
    this.index = index;
    this.name = name;
    this.label = label;
    this.type = type;
  }
}

@Component({
    selector: 'money-admin-rule',
    templateUrl: 'html/admin/rule.html',
    directives: [DisplayErrorDirective], //TOOLTIP_DIRECTIVES
    pipes: [CatfilterPipe, CategorySorterPipe]
})
export class AdminRuleComponent {
  createForm: ControlGroup;
  newRule: Rule = new Rule();
  fieldNames: Array<FieldHelper> = [];
  stringOperators:Array<OperatorHelper> = [];
  numOperators:Array<OperatorHelper> = [];
  dummyFieldConditionsControl: Control;
  categoryType: CatType;
  categoryFrequency: CatFrequency;
  categories: Array<Category>;
  rules: Array<any>; //Rules populated with category

  constructor(private _ruleRestService : RuleRestService,
    private _categoryRestService : CategoryRestService,
    fb: FormBuilder,
    private elementRef:ElementRef) {

    this._categoryRestService.list().subscribe(categories => {
      this.categories = categories;
    });

    this._ruleRestService.list().subscribe(rules => {
      this.rules = rules;
      console.log(rules);
    });

    let ruleConditionValidator = new RuleConditionValidator(this);
    this.dummyFieldConditionsControl = fb.control('', ruleConditionValidator.validate);

    this.stringOperators.push(new OperatorHelper(CondOperator.EQUAL, "equals"));
    this.stringOperators.push(new OperatorHelper(CondOperator.CONTAINS, "contains"));

    this.numOperators.push(new OperatorHelper(CondOperator.EQUAL, "equals"));
    this.numOperators.push(new OperatorHelper(CondOperator.GREATERTHAN, "is greater than"));
    this.numOperators.push(new OperatorHelper(CondOperator.LOWERTHAN, "is lower than"));

    this.fieldNames.push(new FieldHelper(0, "amount", "Amount", CondFieldType.NUMBER));
    this.fieldNames.push(new FieldHelper(1, "communication", "Communication", CondFieldType.STRING));
    this.fieldNames.push(new FieldHelper(2, "comment", "Description", CondFieldType.STRING));
    this.fieldNames.push(new FieldHelper(3, "thirdPartyAccountName", "Third-party account name", CondFieldType.STRING));
    this.fieldNames.push(new FieldHelper(4, "thirdPartyAccountNumber", "Third-party account number", CondFieldType.STRING));

    this.createForm = fb.group({
      name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
      catType: fb.control('', Validators.required),
      catFrequency: fb.control('', Validators.required),
      catId: fb.control('', Validators.required),
      conditions: this.dummyFieldConditionsControl
    });
  }

  fieldChanged(condition: Condition, $event) {
    condition.fieldName = this.fieldNames[$event.target.value].name;
    condition.fieldType = this.fieldNames[$event.target.value].type;
    condition.valueStr = undefined;
    condition.valueNum = undefined;
    if (condition.fieldType == CondFieldType.STRING) {
      condition.availableOperators = this.stringOperators;
    } else if (condition.fieldType == CondFieldType.NUMBER) {
      condition.availableOperators = this.numOperators;
    }
    this.dummyFieldConditionsControl.updateValue($event); //Just to fire change detection
  }

  onConditionUpdated($event) {
    this.dummyFieldConditionsControl.markAsDirty();
    this.dummyFieldConditionsControl.updateValue($event); //Just to fire change detection
  }

  onAddCondition() {
    this.newRule.conditions.push(new Condition());
    this.dummyFieldConditionsControl.updateValue("add"); //Just to fire change detection
  }

  onRemoveCondition() {
    this.newRule.conditions.pop();
    this.dummyFieldConditionsControl.updateValue("remove"); //Just to fire change detection
  }

  onCatTypeChanged($event) {
    this.categoryType = CatType[<string>$event.target.value];
  }

  onCatFrequencyChanged($event) {
    this.categoryFrequency = CatFrequency[<string>$event.target.value];
  }

  onCreate() {
    this._ruleRestService.create(this.newRule).subscribe(newrule => {
      newrule.category = this.categories.filter(category => category.id == this.newRule.category).pop();
      this.rules.push(newrule);
      console.log("Rule added");
    }, err => console.log(err));
  }

  onDisable(rule: Rule) {
    rule.isActive = false;
    this._ruleRestService.update(rule).subscribe(data => {
      console.log("Rule updated");
    }, err => console.log(err))
  }

  onEnable(rule: Rule) {
    rule.isActive = true;
    this._ruleRestService.update(rule).subscribe(data => {
      console.log("Rule updated");
    }, err => console.log(err))
  }

  onDelete(rule: Rule, j: number) {
    this._ruleRestService.delete(rule.id).subscribe(data => {
      this.rules.splice(j, 1);
      console.log("Rule deleted");
    }, err => console.log(err))
  }

  getConditionsForRule(rule: Rule): string {
    let tooltip = "";
    for (let cond of rule.conditions) {
      if (tooltip != "") {
        tooltip += " and ";
      }
      if (cond.fieldType == CondFieldType.STRING) {
        tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueStr + "'";
      } else if (cond.fieldType == CondFieldType.NUMBER) {
        tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueNum + "'";
      }
    }
    return tooltip
  }
}
