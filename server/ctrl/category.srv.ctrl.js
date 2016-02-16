var Category = require('mongoose').model('Category'),
    Transaction = require('../model/import/tx.srv.model');

var getErrorMessage = function (err) {
    var message = '',
        errName;

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Category already exists';
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
  var category = new Category(req.body);
  category.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

exports.addTx = function (req, res) {
  var tx = req.body.tx;
  var catLink = req.body.categoryLink;
  Category.update({ _id: catLink.categoryId,
                    periods : {
                      $elemMatch: { year: catLink.categoryYear, index: catLink.periodIndex }
                    }
                  },
                  {
                    $push: { "periods.$.txList" : tx },
                    $inc: { "periods.$.total" : Math.abs(tx.amount) }
                  },
                  function (err) {
                    if (err) {
                      return res.status(400).send({
                        message: getErrorMessage(err)
                      });
                    } else {
                      res.json(tx);
                    }
                  }
  );
};

exports.list = function (req, res) {
    var queryObj = {};

    Category.find(queryObj).exec(function (err, categories) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(categories);
        }
    });
};

exports.search = function (req, res) {
  var year = req.query.year;
  if (req.query.id) {
    var catId = req.query.id;
    Category.findOne({_id: catId, years: year}).exec(function (err, category) {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(category);
      }
    });
  } else {
    Category.find({years: year}).exec(function (err, categories) {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(categories);
      }
    });
  }
};

exports.categoryByID = function (req, res, next, id) {
    Category.findById(id).exec(function (err, category) {
        if (err) {
            return next(err);
        }
        if (!category) {
            return next(new Error('Failed to load category ' + id));
        }
        req.category = category;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.category);
};

exports.update = function (req, res) {
    var category = req.category;
    category.name = req.body.name;
    category.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(category);
        }
    });
};

exports.delete = function (req, res) {
    var category = req.category;
    category.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(category);
        }
    });
};
