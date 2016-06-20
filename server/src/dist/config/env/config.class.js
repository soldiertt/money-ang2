"use strict";
var Config = (function () {
    function Config(secret, db, engine) {
        this.sessionSecret = secret;
        this.db = db;
        this.viewEngine = engine;
    }
    return Config;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;
//# sourceMappingURL=config.class.js.map