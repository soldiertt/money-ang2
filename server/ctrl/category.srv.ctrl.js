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
                    $inc: { "periods.$.total" : tx.amount }
                  },
                  function (err) {
                    if (err) {
                      return res.status(400).send({
                        message: basicCrudCtrl.getErrorMessage(err)
                      });
                    } else {
                      res.json(tx);
                    }
                  }
  );
};

basicCrudCtrl.removeTx = function (req, res) {
  var tx = req.body;
  var periodId = req.params.periodId;
  Category.update({ "periods._id" : periodId },
                  {
                    $pull: { "periods.$.txList" : { _id : tx.id} },
                    $inc: { "periods.$.total" : -tx.amount }
                  },
                  function (err) {
                    if (err) {
                      return res.status(400).send({
                        message: basicCrudCtrl.getErrorMessage(err)
                      });
                    } else {
                      res.json(tx);
                    }
                  }
  );
  /*category.periods.id(periodId).txList.id(txId).remove();
  category.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: basicCrudCtrl.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });*/
};

basicCrudCtrl.search = function (req, res) {
  var year = req.query.year;
  if (req.query.id) {
    // Make sure the specific category exists within a specific year
    var catId = req.query.id;
    Category.findOne({_id: catId, years: year}).exec(function (err, category) {
      if (err) {
        return res.status(400).send({
          message: basicCrudCtrl.getErrorMessage(err)
        });
      } else {
        res.json(category);
      }
    });
  } else {
    // Find all categories for a specific year
    Category.find({years: year}, '-periods.txList').exec(function (err, categories) {
      if (err) {
        return res.status(400).send({
          message: basicCrudCtrl.getErrorMessage(err)
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
  var periodId = req.query.periodId;

  if (categoryId && years) {
    //Check if category contains any Tx for a array of years
    Category.findOne({
          _id: categoryId,
          periods : {
            $elemMatch: { year: { $in: years },
                          txList: { $exists: true, $ne: [] }
                        }
          }
        }, function (err, category) {
          if (err) {
            return res.status(400).send({
              message: basicCrudCtrl.getErrorMessage(err)
            });
          } else {
            res.json(category);
          }
    });
  } else if (categoryId && periodId) {
    // Retrieve all Tx for a given period.
    console.log("find Tx for given category and period", categoryId, periodId);
    Category.findOne({ _id: categoryId, 'periods._id' : periodId }, {'periods.$' : 1 }, function (err, category) {
      if (err) {
        return res.status(400).send({
          message: basicCrudCtrl.getErrorMessage(err)
        });
      } else {
        res.json(category);
      }
    });
  }
};

basicCrudCtrl.update = function (req, res) {
  var category = req.object;
  category.years = req.body.years;
  category.periods = req.body.periods;
  category.save(function (err) {
      if (err) {
          return res.status(400).send({
              message: basicCrudCtrl.getErrorMessage(err)
          });
      } else {
          res.json(category);
      }
  });

  /*var category = req.object;
  Category.findOneAndUpdate({ _id: category.id }, { $set: {years: req.body.years} }).exec(function(err, categ) {
            if (err) {
              return res.status(400).send({
                message: basicCrudCtrl.getErrorMessage(err)
              });
            } else {
              res.json(categ);
            }
          });*/
};

module.exports = basicCrudCtrl;
