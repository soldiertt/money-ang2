System.register([], function(exports_1) {
    var CatFrequency;
    return {
        setters:[],
        execute: function() {
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
