System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Condition, Rule;
    return {
        setters:[],
        execute: function() {
            Condition = (function () {
                function Condition() {
                    this.availableOperators = [];
                }
                return Condition;
            }());
            exports_1("Condition", Condition);
            Rule = (function () {
                function Rule() {
                    this.conditions = [new Condition()];
                    this.isActive = true;
                }
                return Rule;
            }());
            exports_1("Rule", Rule);
        }
    }
});
