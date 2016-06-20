"use strict";
var indexCtrl = require("../ctrl/index.srv.ctrl");
function default_1(app) {
    app.get("/", indexCtrl.render);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=index.srv.route.js.map