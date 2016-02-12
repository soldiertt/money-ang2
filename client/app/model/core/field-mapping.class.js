System.register([], function(exports_1) {
    var FieldMapping;
    return {
        setters:[],
        execute: function() {
            FieldMapping = (function () {
                function FieldMapping(value, index) {
                    this.value = value;
                    this.index = index;
                    this.isDateDMY = false;
                    this.isDateYMD = false;
                    // set default value, true will be set at validation time and comma will be ignored, improvement is to manage us format.
                    this.isBelgianNumber = false;
                }
                return FieldMapping;
            })();
            exports_1("FieldMapping", FieldMapping);
        }
    }
});
