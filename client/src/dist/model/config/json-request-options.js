System.register(["@angular/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var http_1;
    var JsonRequestOptions;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            JsonRequestOptions = (function (_super) {
                __extends(JsonRequestOptions, _super);
                function JsonRequestOptions() {
                    _super.call(this, {
                        headers: new http_1.Headers({
                            "Content-Type": "application/json; charset=utf-8",
                            "Accept": "application/json"
                        })
                    });
                }
                return JsonRequestOptions;
            }(http_1.RequestOptions));
            exports_1("JsonRequestOptions", JsonRequestOptions);
        }
    }
});
//# sourceMappingURL=json-request-options.js.map