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

basicCrudCtrl.readByRef = function (req, res) {
  res.json(req.object);
};

module.exports = basicCrudCtrl;
