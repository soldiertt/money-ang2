var AccountSetting = require('mongoose').model('AccountSetting');

var getErrorMessage = function (err) {
    var message = '',
        errName;

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'AccountSetting already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else if (err.errors) {
        for (errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    } else {
        message = 'Unknown server error';
    }
    return message;
};

exports.create = function (req, res) {
   console.log(req.body);
    var accountSetting = new AccountSetting(req.body);
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

exports.list = function (req, res) {
    var queryObj = {};

    AccountSetting.find(queryObj).exec(function (err, accountSettings) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(accountSettings);
        }
    });
};

exports.categoryByID = function (req, res, next, id) {
    AccountSetting.findById(id).exec(function (err, accountSetting) {
        if (err) {
            return next(err);
        }
        if (!accountSetting) {
            return next(new Error('Failed to load accountSetting ' + id));
        }
        req.accountSetting = accountSetting;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.accountSetting);
};

exports.update = function (req, res) {
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

exports.delete = function (req, res) {
    var accountSetting = req.accountSetting;
    accountSetting.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(accountSetting);
        }
    });
};
