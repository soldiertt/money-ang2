"use strict";
var config_1 = require("./config");
var http = require("http");
var express = require("express");
var morgan = require("morgan");
var compress = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var index_srv_route_1 = require("../routes/index.srv.route");
var category_srv_route_1 = require("../routes/category.srv.route");
var account_setting_srv_route_1 = require("../routes/account-setting.srv.route");
var csvupload_srv_route_1 = require("../routes/csvupload.srv.route");
var preference_srv_route_1 = require("../routes/preference.srv.route");
var csvfiles_srv_route_1 = require("../routes/csvfiles.srv.route");
var txref_srv_route_1 = require("../routes/txref.srv.route");
var rule_srv_route_1 = require("../routes/rule.srv.route");
var filter_preset_srv_route_1 = require("../routes/filter-preset.srv.route");
function default_1() {
    var app = express(), server = http.createServer(app);
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    else if (process.env.NODE_ENV === "production") {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.set("views", "./server/src/views");
    app.set("view engine", config_1.default().viewEngine);
    index_srv_route_1.default(app);
    category_srv_route_1.default(app);
    account_setting_srv_route_1.default(app);
    csvupload_srv_route_1.default(app);
    preference_srv_route_1.default(app);
    csvfiles_srv_route_1.default(app);
    txref_srv_route_1.default(app);
    rule_srv_route_1.default(app);
    filter_preset_srv_route_1.default(app);
    app.use(function errorHandler(err, req, res, next) {
        res.writeHead(500, { "Content-Type": "application/json" });
        var error = { error: err.message };
        res.end(JSON.stringify(error));
    });
    app.use(express.static("./client/src"));
    app.use("/lib", express.static("./node_modules"));
    return server;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=express.js.map