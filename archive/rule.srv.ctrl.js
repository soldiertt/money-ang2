var Rule = require('mongoose').model('Rule'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Rule, 'Rule');

basicCrudCtrl.update = function (req, res) {
    var rule = req.object;
    rule.name = req.body.name;
    rule.conditions = req.body.conditions;
    rule.categoryId = req.body.categoryId;
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

  Rule.find(queryObj).populate('categoryId', '-periods').lean().exec(function (err, objectList) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      objectList = objectList.map(function(elem) {
        elem.id = elem._id;
        elem.category = elem.categoryId; // id was populated with object
        elem.categoryId = elem.category._id;
        return elem;
      });
      res.json(objectList);
    }
  });
};

module.exports = basicCrudCtrl;
