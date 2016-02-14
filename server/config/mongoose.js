var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    console.log(config.db);
    var db = mongoose.connect(config.db);
    require('../model/category.srv.model');
    require('../model/tx.srv.model');
    require('../model/account-setting.srv.model');
    require('../model/preference.srv.model');
    return db;
};
