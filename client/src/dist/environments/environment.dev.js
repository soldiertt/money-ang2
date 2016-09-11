System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var environment;
    return {
        setters:[],
        execute: function() {
            exports_1("environment", environment = {
                production: false,
                webApiBaseUrl: 'http://localhost:3000/restapi'
            });
        }
    }
});
//# sourceMappingURL=environment.dev.js.map