var Txref = require('mongoose').model('Txref'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Txref, 'Txref');

basicCrudCtrl.findByRef = function (req, res, next, ref) {
  Txref.findOne({ref: ref}).exec(function (err, object) {
    if (err) {
      return next(err);
    }
    req.object = object;
    next();
  });
};

basicCrudCtrl.find = function (req, res) {
  var txrefList = req.query.txref;
  Txref.find({
        ref: { $in: txrefList }
      }
  ).exec(function (err, references) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(references);
    }
  });

}

module.exports = basicCrudCtrl;
