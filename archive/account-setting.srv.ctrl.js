var AccountSetting = require('mongoose').model('AccountSetting'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(AccountSetting, 'AccountSetting');

basicCrudCtrl.update = function (req, res) {
    var accountSetting = req.accountSetting;
    accountSetting.name = req.body.name;
    accountSetting.accountNumber = req.body.accountNumber;
    accountSetting.headerLinesCount = req.body.headerLinesCount;
    accountSetting.fieldSeparator = req.body.fieldSeparator;
    accountSetting.fieldMappings = req.body.fieldMappings;
    accountSetting.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(accountSetting);
        }
    });
};

module.exports = basicCrudCtrl;
