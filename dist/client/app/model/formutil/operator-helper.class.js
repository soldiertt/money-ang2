System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OperatorHelper;
    return {
        setters:[],
        execute: function() {
            OperatorHelper = (function () {
                function OperatorHelper(operator, label) {
                    this.operator = operator;
                    this.label = label;
                }
                return OperatorHelper;
            }());
            exports_1("OperatorHelper", OperatorHelper);
        }
    }
});
