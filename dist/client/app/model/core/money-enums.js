System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CatType, CatFrequency, CondOperator, CondFieldType;
    return {
        setters:[],
        execute: function() {
            (function (CatType) {
                CatType[CatType["FIXED"] = "FIXED"] = "FIXED";
                CatType[CatType["OTHER"] = "OTHER"] = "OTHER";
                CatType[CatType["INCOMING"] = "INCOMING"] = "INCOMING";
            })(CatType || (CatType = {}));
            exports_1("CatType", CatType);
            ;
            (function (CatFrequency) {
                CatFrequency[CatFrequency["MONTHLY"] = "MONTHLY"] = "MONTHLY";
                CatFrequency[CatFrequency["QUARTER"] = "QUARTER"] = "QUARTER";
                CatFrequency[CatFrequency["YEARLY"] = "YEARLY"] = "YEARLY";
            })(CatFrequency || (CatFrequency = {}));
            exports_1("CatFrequency", CatFrequency);
            ;
            (function (CondOperator) {
                CondOperator[CondOperator["EQUAL"] = "EQUAL"] = "EQUAL";
                CondOperator[CondOperator["GREATERTHAN"] = "GREATERTHAN"] = "GREATERTHAN";
                CondOperator[CondOperator["LOWERTHAN"] = "LOWERTHAN"] = "LOWERTHAN";
                CondOperator[CondOperator["CONTAINS"] = "CONTAINS"] = "CONTAINS";
            })(CondOperator || (CondOperator = {}));
            exports_1("CondOperator", CondOperator);
            (function (CondFieldType) {
                CondFieldType[CondFieldType["NUMBER"] = "NUMBER"] = "NUMBER";
                CondFieldType[CondFieldType["STRING"] = "STRING"] = "STRING";
            })(CondFieldType || (CondFieldType = {}));
            exports_1("CondFieldType", CondFieldType);
        }
    }
});
