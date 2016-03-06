var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    console.log(config.db);
    var db = mongoose.connect(config.db);
    require('../model/category.srv.model');
    require('../model/txref.srv.model');
    require('../model/account-setting.srv.model');
    require('../model/preference.srv.model');
    require('../model/rule.srv.model');
    return db;
};
