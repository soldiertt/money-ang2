var Rule = require('mongoose').model('Rule'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Rule, 'Rule');

basicCrudCtrl.update = function (req, res) {
    var rule = req.object;
    rule.name = req.body.name;
    rule.conditions = req.body.conditions;
    rule.category = req.body.category;
    rule.isActive = req.body.isActive;
    rule.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(rule);
        }
    });
};

basicCrudCtrl.list = function (req, res) {
    var queryObj = {};

    Rule.find(queryObj).populate('category').exec(function (err, objectList) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(objectList);
        }
    });
};

module.exports = basicCrudCtrl;
