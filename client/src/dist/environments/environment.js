// The file for the current environment will overwrite this one during build.
// Different environments can be found in ./environment.{dev|prod}.ts, and
// you can create your own and use it with the --env flag.
// The build system defaults to the dev environment.
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
//# sourceMappingURL=environment.js.map