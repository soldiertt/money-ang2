System.register([], function(exports_1) {
    var CatType, CatFrequency;
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
        }
    }
});
