import {Injectable} from 'angular2/core'
import {RuleRestService}      from './rule-rest.service'
import {CategoryRestService}  from './category-rest.service'
import {Tx}                   from '../model/core/tx.class'
import {Category}             from '../model/core/category.class'
import {TxFormData}           from '../model/formutil/tx-form-data.class'
import {Rule, Condition}      from '../model/core/rule.class'
import {CondOperator, CondFieldType} from '../model/core/money-enums'

@Injectable()
export class RuleService {

  allRules:Array<Rule>;

  constructor(private _ruleRestService: RuleRestService,
    private _categoryRestService: CategoryRestService) {
    this.reloadRules();
  }

  reloadRules() {
    this._ruleRestService.list().subscribe(rules => {
      this.allRules = rules;
    })
  }

  applyRules(tx: Tx, checkCategoryExists:boolean = false): TxFormData {
    let out:TxFormData = new TxFormData(tx);
    this.allRules.forEach(rule => {
      if (rule.isActive) {
        let match = true;
        rule.conditions.forEach(condition => {
          let txField = this.getField(tx, condition.fieldName);
          if (txField) {
            switch (condition.fieldType) {
              case CondFieldType.STRING:
                match = match && this.matchStrCondition(match, condition, txField);
                break;
              case CondFieldType.NUMBER:
                match = match && this.matchNumCondition(match, condition, txField);
                break;
            }
          } else {
            match = false;
          }
        });
        if (match) {
          let categ: Category = <Category> rule.category;
          out.categoryType = categ.type;
          out.categoryFrequency = categ.frequency;
          out.categoryLink.categoryId = categ.id;
          out.appliedRule = rule.name;
          if (checkCategoryExists) {
            (function(comp:RuleService, out: TxFormData, categ: Category) {
              comp._categoryRestService.existsCategoryForYear(categ.id, out.tx.date.getFullYear()).subscribe(category => {
                if (!category) {
                  out.categoryLink.categoryId="";
                  console.warn("Cannot apply rule cause category", categ.name, "is not available for year", out.tx.date.getFullYear());
                }
              });
            })(this, out, categ);
          }
        }
      }
    });
    return out;
  }

  getField(tx: Tx, fieldName: string): any {
    switch (fieldName) {
      case 'amount':
        return tx.amount;
      case 'comment':
        return tx.comment;
      case 'thirdPartyAccountName':
        return tx.thirdPartyAccount.name;
      case 'thirdPartyAccountNumber':
        return tx.thirdPartyAccount.number;
      case 'communication':
        return tx.communication;
    }
  }

  matchStrCondition(match:boolean, condition:Condition, txField): boolean {
    switch (condition.operator) {
      case CondOperator.EQUAL:
        match = match && (txField === condition.valueStr);
        break;
      case CondOperator.CONTAINS:
        match = match && (txField.indexOf(condition.valueStr) != -1);
        break;
    }
    return match;
  }

  matchNumCondition(match:boolean, condition:Condition, txField): boolean {
    switch (condition.operator) {
      case CondOperator.EQUAL :
        match = match && (Math.abs(txField) === (condition.valueNum * 100));
        break;
      case CondOperator.GREATERTHAN:
        match = match && (Math.abs(txField) > (condition.valueNum * 100));
        break;
      case CondOperator.LOWERTHAN:
        match = match && (Math.abs(txField) < (condition.valueNum * 100));
        break;
    }
    return match;
  }
}
