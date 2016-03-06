System.register(['../../model/core/money-enums'], function(exports_1) {
    var money_enums_1;
    var RuleConditionValidator;
    return {
        setters:[
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            }],
        execute: function() {
            RuleConditionValidator = (function () {
                function RuleConditionValidator(component) {
                    var validator = this;
                    validator.validate = function (control) {
                        return validator.validateConditions(component);
                    };
                }
                RuleConditionValidator.prototype.validateConditions = function (component) {
                    var valid = true;
                    for (var _i = 0, _a = component.newRule.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        if (!condition.fieldName || !condition.fieldType || !condition.operator) {
                            valid = false;
                        }
                        else {
                            switch (condition.fieldType) {
                                case money_enums_1.CondFieldType.STRING:
                                    if (!condition.valueStr) {
                                        valid = false;
                                    }
                                    break;
                                case money_enums_1.CondFieldType.NUMBER:
                                    if (!condition.valueNum) {
                                        valid = false;
                                    }
                                    break;
                            }
                        }
                    }
                    if (valid) {
                        return null;
                    }
                    else {
                        return { "wrongConditions": true };
                    }
                };
                return RuleConditionValidator;
            })();
            exports_1("RuleConditionValidator", RuleConditionValidator);
        }
    }
});
