"use strict";
var development_1 = require("./env/development");
var production_1 = require("./env/production");
function default_1() {
    if (process.env.NODE_ENV === "production") {
        return production_1.default;
    }
    else {
        return development_1.default;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=config.js.map