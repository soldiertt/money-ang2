var Category = require('mongoose').model('Category'),
    Transaction = require('../model/import/tx.srv.model'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Category, 'Category');

basicCrudCtrl.addTx = function (req, res) {
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

basicCrudCtrl.search = function (req, res) {
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
    Category.find({years: year}, '-periods.txList').exec(function (err, categories) {
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

basicCrudCtrl.searchTx = function (req, res) {
  var categoryId = req.query.categoryId;
  var years = req.query.years;
  if (categoryId) {
    Category.find({
          _id: categoryId,
          periods : {
            $elemMatch: { year: { $in: years },
                          txList: { $exists: true, $ne: [] }
                        }
          }
        }
    ).exec(function (err, categories) {
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

basicCrudCtrl.update = function (req, res) {
    var category = req.category;
    category.years = req.body.years;
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

module.exports = basicCrudCtrl;
