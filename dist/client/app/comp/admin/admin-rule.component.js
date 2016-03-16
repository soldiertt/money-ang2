System.register(['angular2/core', 'angular2/common', '../../model/core/rule.class', '../../model/formutil/operator-helper.class', '../../model/core/money-enums', '../../model/validation/rule-condition-validator.class', '../../service/rule-rest.service', '../../service/rule.service', '../../service/category-rest.service', '../directive/display-error.directive', '../../pipe/money-pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, rule_class_1, operator_helper_class_1, money_enums_1, rule_condition_validator_class_1, rule_rest_service_1, rule_service_1, category_rest_service_1, display_error_directive_1, money_pipes_1;
    var FieldHelper, AdminRuleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (rule_class_1_1) {
                rule_class_1 = rule_class_1_1;
            },
            function (operator_helper_class_1_1) {
                operator_helper_class_1 = operator_helper_class_1_1;
            },
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            },
            function (rule_condition_validator_class_1_1) {
                rule_condition_validator_class_1 = rule_condition_validator_class_1_1;
            },
            function (rule_rest_service_1_1) {
                rule_rest_service_1 = rule_rest_service_1_1;
            },
            function (rule_service_1_1) {
                rule_service_1 = rule_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            //import {TOOLTIP_DIRECTIVES}           from 'ng2-bootstrap/ng2-bootstrap';
            FieldHelper = (function () {
                function FieldHelper(index, name, label, type) {
                    this.index = index;
                    this.name = name;
                    this.label = label;
                    this.type = type;
                }
                return FieldHelper;
            }());
            AdminRuleComponent = (function () {
                function AdminRuleComponent(_ruleRestService, _categoryRestService, fb, elementRef, _ruleService) {
                    var _this = this;
                    this._ruleRestService = _ruleRestService;
                    this._categoryRestService = _categoryRestService;
                    this.elementRef = elementRef;
                    this._ruleService = _ruleService;
                    this.newRule = new rule_class_1.Rule();
                    this.fieldNames = [];
                    this.stringOperators = [];
                    this.numOperators = [];
                    this._categoryRestService.list().subscribe(function (categories) {
                        _this.categories = categories;
                    });
                    this._ruleRestService.list().subscribe(function (rules) {
                        _this.rules = rules;
                        console.log(rules);
                    });
                    var ruleConditionValidator = new rule_condition_validator_class_1.RuleConditionValidator(this);
                    this.dummyFieldConditionsControl = fb.control('', ruleConditionValidator.validate);
                    this.stringOperators.push(new operator_helper_class_1.OperatorHelper(money_enums_1.CondOperator.EQUAL, "equals"));
                    this.stringOperators.push(new operator_helper_class_1.OperatorHelper(money_enums_1.CondOperator.CONTAINS, "contains"));
                    this.numOperators.push(new operator_helper_class_1.OperatorHelper(money_enums_1.CondOperator.EQUAL, "equals"));
                    this.numOperators.push(new operator_helper_class_1.OperatorHelper(money_enums_1.CondOperator.GREATERTHAN, "is greater than"));
                    this.numOperators.push(new operator_helper_class_1.OperatorHelper(money_enums_1.CondOperator.LOWERTHAN, "is lower than"));
                    this.fieldNames.push(new FieldHelper(0, "amount", "Amount", money_enums_1.CondFieldType.NUMBER));
                    this.fieldNames.push(new FieldHelper(1, "communication", "Communication", money_enums_1.CondFieldType.STRING));
                    this.fieldNames.push(new FieldHelper(2, "comment", "Description", money_enums_1.CondFieldType.STRING));
                    this.fieldNames.push(new FieldHelper(3, "thirdPartyAccountName", "Third-party account name", money_enums_1.CondFieldType.STRING));
                    this.fieldNames.push(new FieldHelper(4, "thirdPartyAccountNumber", "Third-party account number", money_enums_1.CondFieldType.STRING));
                    this.createForm = fb.group({
                        name: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(50)])),
                        catType: fb.control('', common_1.Validators.required),
                        catFrequency: fb.control('', common_1.Validators.required),
                        catId: fb.control('', common_1.Validators.required),
                        conditions: this.dummyFieldConditionsControl
                    });
                }
                AdminRuleComponent.prototype.fieldChanged = function (condition, $event) {
                    condition.fieldName = this.fieldNames[$event.target.value].name;
                    condition.fieldType = this.fieldNames[$event.target.value].type;
                    condition.valueStr = undefined;
                    condition.valueNum = undefined;
                    if (condition.fieldType == money_enums_1.CondFieldType.STRING) {
                        condition.availableOperators = this.stringOperators;
                    }
                    else if (condition.fieldType == money_enums_1.CondFieldType.NUMBER) {
                        condition.availableOperators = this.numOperators;
                    }
                    this.dummyFieldConditionsControl.updateValue($event); //Just to fire change detection
                };
                AdminRuleComponent.prototype.onConditionUpdated = function ($event) {
                    this.dummyFieldConditionsControl.markAsDirty();
                    this.dummyFieldConditionsControl.updateValue($event); //Just to fire change detection
                };
                AdminRuleComponent.prototype.onAddCondition = function () {
                    this.newRule.conditions.push(new rule_class_1.Condition());
                    this.dummyFieldConditionsControl.updateValue("add"); //Just to fire change detection
                };
                AdminRuleComponent.prototype.onRemoveCondition = function () {
                    this.newRule.conditions.pop();
                    this.dummyFieldConditionsControl.updateValue("remove"); //Just to fire change detection
                };
                AdminRuleComponent.prototype.onCatTypeChanged = function ($event) {
                    this.categoryType = money_enums_1.CatType[$event.target.value];
                };
                AdminRuleComponent.prototype.onCatFrequencyChanged = function ($event) {
                    this.categoryFrequency = money_enums_1.CatFrequency[$event.target.value];
                };
                AdminRuleComponent.prototype.onCreate = function () {
                    var _this = this;
                    this._ruleRestService.create(this.newRule).subscribe(function (newrule) {
                        newrule.category = _this.categories.filter(function (category) { return category.id == _this.newRule.category; }).pop();
                        _this.rules.push(newrule);
                        console.log("Rule added");
                        _this._ruleService.reloadRules();
                    }, function (err) { return console.log(err); });
                };
                AdminRuleComponent.prototype.onDisable = function (rule) {
                    rule.isActive = false;
                    this._ruleRestService.update(rule).subscribe(function (data) {
                        console.log("Rule updated");
                    }, function (err) { return console.log(err); });
                };
                AdminRuleComponent.prototype.onEnable = function (rule) {
                    rule.isActive = true;
                    this._ruleRestService.update(rule).subscribe(function (data) {
                        console.log("Rule updated");
                    }, function (err) { return console.log(err); });
                };
                AdminRuleComponent.prototype.onDelete = function (rule, j) {
                    var _this = this;
                    this._ruleRestService.delete(rule.id).subscribe(function (data) {
                        _this.rules.splice(j, 1);
                        console.log("Rule deleted");
                    }, function (err) { return console.log(err); });
                };
                AdminRuleComponent.prototype.getConditionsForRule = function (rule) {
                    var tooltip = "";
                    for (var _i = 0, _a = rule.conditions; _i < _a.length; _i++) {
                        var cond = _a[_i];
                        if (tooltip != "") {
                            tooltip += " and ";
                        }
                        if (cond.fieldType == money_enums_1.CondFieldType.STRING) {
                            tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueStr + "'";
                        }
                        else if (cond.fieldType == money_enums_1.CondFieldType.NUMBER) {
                            tooltip += cond.fieldName + " " + cond.operator + " '" + cond.valueNum + "'";
                        }
                    }
                    return tooltip;
                };
                AdminRuleComponent = __decorate([
                    core_1.Component({
                        selector: 'money-admin-rule',
                        templateUrl: 'html/admin/rule.html',
                        directives: [display_error_directive_1.DisplayErrorDirective],
                        pipes: [money_pipes_1.CatfilterPipe, money_pipes_1.CategorySorterPipe]
                    }), 
                    __metadata('design:paramtypes', [rule_rest_service_1.RuleRestService, category_rest_service_1.CategoryRestService, common_1.FormBuilder, core_1.ElementRef, rule_service_1.RuleService])
                ], AdminRuleComponent);
                return AdminRuleComponent;
            }());
            exports_1("AdminRuleComponent", AdminRuleComponent);
        }
    }
});
