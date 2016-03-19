System.register(['./category.class'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var category_class_1;
    var Condition, Rule;
    return {
        setters:[
            function (category_class_1_1) {
                category_class_1 = category_class_1_1;
            }],
        execute: function() {
            Condition = (function () {
                function Condition() {
                }
                return Condition;
            }());
            exports_1("Condition", Condition);
            Rule = (function () {
                function Rule() {
                    this.conditions = [new Condition()];
                    this.isActive = true;
                    this.category = new category_class_1.Category(null, null, null, []);
                }
                return Rule;
            }());
            exports_1("Rule", Rule);
        }
    }
});
