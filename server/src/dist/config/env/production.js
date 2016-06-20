"use strict";
var config_class_1 = require("./config.class");
var config = new config_class_1.default("productionSessionSecret", "mongodb://admin:THVtih7CgW-a@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ":" + process.env.OPENSHIFT_MONGODB_DB_PORT + "/moneyv2", "ejs");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=production.js.map