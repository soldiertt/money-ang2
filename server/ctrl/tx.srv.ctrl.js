var Transaction = require('mongoose').model('Transaction'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Transaction);

basicCrudCtrl.update = function (req, res) {
  var tx = req.object;
  tx.comment = req.body.comment;
  tx.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(tx);
    }
  });
};

basicCrudCtrl.findByRef = function (req, res, next, ref) {
  Transaction.findOne({ref: ref}).exec(function (err, object) {
    if (err) {
      return next(err);
    }
    req.object = object;
    next();
  });
};

basicCrudCtrl.readByRef = function (req, res) {
  res.json(req.object);
};

module.exports = basicCrudCtrl;
