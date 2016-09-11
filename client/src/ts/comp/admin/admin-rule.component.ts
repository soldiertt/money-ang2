import {Component, ElementRef} from "@angular/core";
import {FormControl, FormBuilder, Validators, FormGroup, FormArray} from "@angular/forms";

import {Condition, Rule}              from "../../model/core/rule.class";
import {Category}                     from "../../model/core/category.class";
import {OperatorHelper}               from "../../model/formutil/operator-helper.class";
import {CondFieldType, CondOperator, CatType, CatFrequency}  from "../../model/core/money-enums";
import {RuleConditionValidator}       from "../../model/validation/rule-condition-validator.class";
import {RuleRestService}              from "../../service/rule-rest.service";
import {RuleService}                  from "../../service/rule.service";
import {CategoryRestService}          from "../../service/category-rest.service";

class FieldHelper {
  index: number;
  name: string;
  label: string;
  type: CondFieldType;
  constructor(index: number, name: string, label: string, type: CondFieldType) {
    this.index = index;
    this.name = name;
    this.label = label;
    this.type = type;
  }
}

@Component({
    selector: "money-admin-rule",
    templateUrl: "assets/html/admin/rule.html"
})
export class AdminRuleComponent {
  formMode: string = "create";
  createForm: FormGroup;
  newRule: Rule = new Rule();
  editedRuleIndex: number;
  fieldNames: Array<FieldHelper> = [];
  stringOperators: Array<OperatorHelper> = [];
  numOperators: Array<OperatorHelper> = [];
  dummyFieldConditionsControl: FormControl;
  categories: Array<Category>;
  rules: Array<any>; // Rules populated with category

  constructor(private _ruleRestService: RuleRestService,
    private _categoryRestService: CategoryRestService,
    fb: FormBuilder,
    private elementRef: ElementRef,
    private _ruleService: RuleService) {

    this._categoryRestService.list().subscribe(categories => {
      this.categories = categories;
    });

    this._ruleRestService.list().subscribe(rules => {
      this.rules = rules;
    });

    let ruleConditionValidator = new RuleConditionValidator(this);
    this.dummyFieldConditionsControl = fb.control("", ruleConditionValidator.validate);

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
      name: fb.control("", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
      catType: fb.control("", Validators.required),
      catFrequency: fb.control("", Validators.required),
      catId: fb.control("", Validators.required),
      conditions: this.dummyFieldConditionsControl
    });
  }

  fieldChanged(condition: Condition, $event) {
    condition.fieldName = this.fieldNames[$event.target.value].name;
    condition.fieldType = this.fieldNames[$event.target.value].type;
    condition.valueStr = undefined;
    condition.valueNum = undefined;
    this.dummyFieldConditionsControl.setValue($event); // Just to fire change detection
  }

  onConditionUpdated($event) {
    this.dummyFieldConditionsControl.markAsDirty();
    this.dummyFieldConditionsControl.setValue($event); // Just to fire change detection
  }

  onAddCondition() {
    this.newRule.conditions.push(new Condition());
    this.dummyFieldConditionsControl.setValue("add"); // Just to fire change detection
  }

  onRemoveCondition() {
    this.newRule.conditions.pop();
    this.dummyFieldConditionsControl.setValue("remove"); // Just to fire change detection
  }

  onCatTypeChanged($event) {
    this.newRule.category.type = CatType[<string>$event.target.value];
  }

  onCatFrequencyChanged($event) {
    this.newRule.category.frequency = CatFrequency[<string>$event.target.value];
  }

  /** Create or Update **/
  onSubmit() {
    if (this.formMode === "create") {
      this._ruleRestService.create(this.newRule).subscribe(newrule => {
        newrule.category = this.categories.filter(category => category.id === this.newRule.categoryId).pop();
        this.rules.push(newrule);
        console.log("Rule added");
        this._ruleService.reloadRules(); // force cache cleanup
        this.newRule = new Rule();
      }, err => console.log(err));
    } else if (this.formMode === "edit") {
      this._ruleRestService.update(this.newRule).subscribe(updatedrule => {
        updatedrule.category = this.categories.filter(category => category.id === this.newRule.categoryId).pop();
        this.rules[this.editedRuleIndex] = updatedrule;
        console.log("Rule updated");
        this._ruleService.reloadRules(); // force cache cleanup
        this.newRule = new Rule();
        this.formMode = "create";
      }, err => console.log(err));
    }
  }

  onDisable(rule: Rule) {
    rule.isActive = false;
    this._ruleRestService.update(rule).subscribe(data => {
      console.log("Rule updated");
      this._ruleService.reloadRules(); // force cache cleanup
    }, err => console.log(err));
  }

  onEnable(rule: Rule) {
    rule.isActive = true;
    this._ruleRestService.update(rule).subscribe(data => {
      console.log("Rule updated");
      this._ruleService.reloadRules(); // force cache cleanup
    }, err => console.log(err));
  }

  onDelete(rule: Rule, j: number) {
    this._ruleRestService.delete(rule.id).subscribe(data => {
      this.rules.splice(j, 1);
      console.log("Rule deleted");
      this._ruleService.reloadRules(); // force cache cleanup
    }, err => console.log(err));
  }

  onEdit(rule: Rule, j: number) {
    this.editedRuleIndex = j;
    this.formMode = "edit";
    this.newRule = rule;
    this.dummyFieldConditionsControl.setValue(j); // Just to fire change detection
  }

  onCancelEdit($event) {
    $event.preventDefault();
    this.newRule = new Rule();
    this.formMode = "create";
  }

  getConditionsForRule(rule: Rule): string {
    let tooltip = "";
    for (let cond of rule.conditions) {
      if (tooltip !== "") {
        tooltip += " and ";
      }
      if (cond.fieldType === CondFieldType.STRING) {
        tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueStr + "'";
      } else if (cond.fieldType === CondFieldType.NUMBER) {
        tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueNum + "'";
      }
    }
    return tooltip;
  }
}
