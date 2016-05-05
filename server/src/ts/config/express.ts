import config             from "./config";
import * as http          from "http";
import * as express       from "express";
import * as morgan        from "morgan";
import * as compress      from "compression";
import * as bodyParser    from "body-parser";
import * as methodOverride from "method-override";
import indexRoute         from "../routes/index.srv.route";
import categoryRoute      from "../routes/category.srv.route";
import accountSettingRoute from "../routes/account-setting.srv.route";
import csvUploadRoute     from "../routes/csvupload.srv.route";
import preferenceRoute    from "../routes/preference.srv.route";
import csvFilesRoute      from "../routes/csvfiles.srv.route";
import txrefRoute         from "../routes/txref.srv.route";
import ruleRoute          from "../routes/rule.srv.route";
import filterPresetRoute  from "../routes/filter-preset.srv.route";

export default function () {
    let app = express(),
        server = http.createServer(app);

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else if (process.env.NODE_ENV === "production") {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set("views", "./server/src/views");
    app.set("view engine", config().viewEngine);

    indexRoute(app);
    categoryRoute(app);
    accountSettingRoute(app);
    csvUploadRoute(app);
    preferenceRoute(app);
    csvFilesRoute(app);
    txrefRoute(app);
    ruleRoute(app);
    filterPresetRoute(app);

    app.use(function errorHandler(err, req: Express.Request, res: express.Response, next) {
      res.writeHead(500, {"Content-Type": "application/json"});
      let error = {error: err.message};
      res.end(JSON.stringify(error));
    });

    app.use(express.static("./client/src"));
    app.use("/lib", express.static("./node_modules"));

    return server;
};
