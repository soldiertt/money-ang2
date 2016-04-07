"use strict";
var config_1 = require('./config');
var mongoose = require('mongoose');
var category_srv_model_1 = require('../model/category.srv.model');
var txref_srv_model_1 = require('../model/txref.srv.model');
var account_setting_srv_model_1 = require('../model/account-setting.srv.model');
var preference_srv_model_1 = require('../model/preference.srv.model');
var rule_srv_model_1 = require('../model/rule.srv.model');
var filter_preset_srv_model_1 = require('../model/filter-preset.srv.model');
function default_1() {
    console.log(config_1.default().db);
    var db = mongoose.connect(config_1.default().db);
    mongoose.model('Category', category_srv_model_1.default);
    mongoose.model('Txref', txref_srv_model_1.default);
    mongoose.model('AccountSetting', account_setting_srv_model_1.default);
    mongoose.model('Preference', preference_srv_model_1.default);
    mongoose.model('Rule', rule_srv_model_1.default);
    mongoose.model('FilterPreset', filter_preset_srv_model_1.default);
    return db;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
