System.register([], function(exports_1) {
    var AccountSetting;
    return {
        setters:[],
        execute: function() {
            AccountSetting = (function () {
                function AccountSetting() {
                    this.headerLinesCount = 0;
                    this.fieldSeparator = ";";
                    this.fieldMappings = [];
                }
                return AccountSetting;
            })();
            exports_1("AccountSetting", AccountSetting);
        }
    }
});
