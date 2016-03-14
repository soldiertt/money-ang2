System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccountSetting;
    return {
        setters:[],
        execute: function() {
            AccountSetting = (function () {
                function AccountSetting() {
                    this.headerLinesCount = 0;
                    this.fieldSeparator = ";";
                    this.fieldMappings = [];
                    this.generateIdentifier = false;
                }
                return AccountSetting;
            }());
            exports_1("AccountSetting", AccountSetting);
        }
    }
});
