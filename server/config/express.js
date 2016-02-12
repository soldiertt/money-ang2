var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'), // http request logger
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

module.exports = function (db) {
    var app = express(),
        server = http.createServer(app),
        mongoStore = new MongoStore({
            mongooseConnection: db.connection
        });

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './server/views');
    app.set('view engine', config.viewEngine);

    require('../routes/index.srv.route.js')(app);
    require('../routes/category.srv.route.js')(app);
    require('../routes/account-setting.srv.route.js')(app);
    require('../routes/csvupload.srv.route.js')(app);
    require('../routes/preference.srv.route.js')(app);

    app.use(express.static('./client'));
    app.use('/lib', express.static('./node_modules'));

    return server;
};
