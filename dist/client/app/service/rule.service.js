System.register(["angular2/core", "./rule-rest.service", "./category-rest.service", "../model/formutil/tx-form-data.class", "../model/core/money-enums"], function(exports_1, context_1) {
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
    var core_1, rule_rest_service_1, category_rest_service_1, tx_form_data_class_1, money_enums_1;
    var RuleService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rule_rest_service_1_1) {
                rule_rest_service_1 = rule_rest_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (tx_form_data_class_1_1) {
                tx_form_data_class_1 = tx_form_data_class_1_1;
            },
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            }],
        execute: function() {
            RuleService = (function () {
                function RuleService(_ruleRestService, _categoryRestService) {
                    this._ruleRestService = _ruleRestService;
                    this._categoryRestService = _categoryRestService;
                    this.reloadRules();
                }
                RuleService.prototype.reloadRules = function () {
                    var _this = this;
                    this._ruleRestService.list().subscribe(function (rules) {
                        _this.allRules = rules;
                    });
                };
                RuleService.prototype.applyRules = function (tx, checkCategoryExists) {
                    var _this = this;
                    if (checkCategoryExists === void 0) { checkCategoryExists = false; }
                    var out = new tx_form_data_class_1.TxFormData(tx);
                    this.allRules.forEach(function (rule) {
                        if (rule.isActive) {
                            var match_1 = true;
                            rule.conditions.forEach(function (condition) {
                                var txField = _this.getField(tx, condition.fieldName);
                                if (txField) {
                                    switch (condition.fieldType) {
                                        case money_enums_1.CondFieldType.STRING:
                                            match_1 = match_1 && _this.matchStrCondition(match_1, condition, txField);
                                            break;
                                        case money_enums_1.CondFieldType.NUMBER:
                                            match_1 = match_1 && _this.matchNumCondition(match_1, condition, txField);
                                            break;
                                    }
                                }
                                else {
                                    match_1 = false;
                                }
                            });
                            if (match_1) {
                                var categ = rule.category;
                                out.categoryType = categ.type;
                                out.categoryFrequency = categ.frequency;
                                out.categoryLink.categoryId = rule.categoryId;
                                out.appliedRule = rule.name;
                                if (checkCategoryExists) {
                                    (function (comp, out, categ) {
                                        comp._categoryRestService.existsCategoryForYear(out.categoryLink.categoryId, out.tx.date.getFullYear()).subscribe(function (category) {
                                            if (!category) {
                                                out.categoryLink.categoryId = "";
                                                console.warn("Cannot apply rule cause category", categ.name, "is not available for year", out.tx.date.getFullYear());
                                            }
                                        });
                                    })(_this, out, categ);
                                }
                            }
                        }
                    });
                    return out;
                };
                RuleService.prototype.getField = function (tx, fieldName) {
                    switch (fieldName) {
                        case "amount":
                            return tx.amount;
                        case "comment":
                            return tx.comment;
                        case "thirdPartyAccountName":
                            return tx.thirdPartyAccount.name;
                        case "thirdPartyAccountNumber":
                            return tx.thirdPartyAccount.number;
                        case "communication":
                            return tx.communication;
                    }
                };
                RuleService.prototype.matchStrCondition = function (match, condition, txField) {
                    switch (condition.operator) {
                        case money_enums_1.CondOperator.EQUAL:
                            match = match && (txField === condition.valueStr);
                            break;
                        case money_enums_1.CondOperator.CONTAINS:
                            match = match && (txField.indexOf(condition.valueStr) !== -1);
                            break;
                    }
                    return match;
                };
                RuleService.prototype.matchNumCondition = function (match, condition, txField) {
                    switch (condition.operator) {
                        case money_enums_1.CondOperator.EQUAL:
                            match = match && (Math.abs(txField) === (condition.valueNum * 100));
                            break;
                        case money_enums_1.CondOperator.GREATERTHAN:
                            match = match && (Math.abs(txField) > (condition.valueNum * 100));
                            break;
                        case money_enums_1.CondOperator.LOWERTHAN:
                            match = match && (Math.abs(txField) < (condition.valueNum * 100));
                            break;
                    }
                    return match;
                };
                RuleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [rule_rest_service_1.RuleRestService, category_rest_service_1.CategoryRestService])
                ], RuleService);
                return RuleService;
            }());
            exports_1("RuleService", RuleService);
        }
    }
});
//# sourceMappingURL=rule.service.js.map