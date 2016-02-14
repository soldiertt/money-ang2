System.register([], function(exports_1) {
    var CatType;
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
        }
    }
});
