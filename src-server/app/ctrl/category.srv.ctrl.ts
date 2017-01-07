import * as mongoose from "mongoose";
import BasicCrudCtrl from "./basic-crud.srv.ctrl";

export default class CategoryCtrl extends BasicCrudCtrl {

  constructor() {
    let categoryModel = mongoose.model("Category");
    super(categoryModel, "Category");
  }

  addTx(req, res) {
    let ctrl = this;
    let tx = req.body.tx;
    let catLink = req.body.categoryLink;
    this.objectModel.update({ _id: catLink.categoryId,
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
              message: ctrl.getErrorMessage(err)
            });
          } else {
            res.json(tx);
          }
        }
    );
  }

  removeTx(req, res) {
    let ctrl = this;
    let tx = req.body;
    let periodId = req.params.periodId;
    this.objectModel.update({ "periods._id" : periodId },
        {
          $pull: { "periods.$.txList" : { _id : tx.id} },
          $inc: { "periods.$.total" : -tx.amount }
        },
        function (err) {
          if (err) {
            return res.status(400).send({
              message: ctrl.getErrorMessage(err)
            });
          } else {
            res.json(tx);
          }
        }
    );
  }

  updatePeriodMarkAsPaid (req, res) {
    let ctrl = this;
    let categoryId = req.body.categoryId;
    let periodId = req.body.periodId;
    let markAsPaid = req.body.markAsPaid;
    this.objectModel.findOneAndUpdate(
      { "_id": categoryId, "periods._id": periodId },
      {
          "$set": {
              "periods.$.markAsPaid": markAsPaid
          }
      },
      function(err, doc) {
        if (err) {
          return res.status(400).send({
            message: ctrl.getErrorMessage(err)
          });
        } else {
          res.json(doc);
        }
      }
    );
  }

  search (req, res) {
    let ctrl = this;
    let year = req.query.year;
    if (req.query.id) {
      // Make sure the specific category exists within a specific year
      let catId = req.query.id;
      this.objectModel.findOne({_id: catId, years: year}).exec(function (err, category) {
        if (err) {
          return res.status(400).send({
            message: ctrl.getErrorMessage(err)
          });
        } else {
          res.json(category);
        }
      });
    } else {
      // Find all categories for a specific year
      this.objectModel.find({years: year}, "-periods.txList").exec(function (err, categories) {
        if (err) {
          return res.status(400).send({
            message: ctrl.getErrorMessage(err)
          });
        } else {
          res.json(categories);
        }
      });
    }
  }

  searchTx (req, res) {
    let ctrl = this;
    let categoryId = req.query.categoryId;
    let years = req.query.years;
    let periodId = req.query.periodId;

    if (categoryId && years) {
      // Check if category contains any Tx for a array of years
      this.objectModel.findOne({
            _id: categoryId,
            periods : {
              $elemMatch: { year: { $in: years },
                            txList: { $exists: true, $ne: [] }
                          }
            }
          }, function (err, category) {
            if (err) {
              return res.status(400).send({
                message: ctrl.getErrorMessage(err)
              });
            } else {
              res.json(category);
            }
      });
    } else if (categoryId && periodId) {
      // Retrieve all Tx for a given period.
      console.log("find Tx for given category and period", categoryId, periodId);
      this.objectModel.findOne({ _id: categoryId, "periods._id" : periodId }, {"periods.$" : 1 }, function (err, category) {
        if (err) {
          return res.status(400).send({
            message: ctrl.getErrorMessage(err)
          });
        } else {
          res.json(category);
        }
      });
    }
  }

  update (req, res) {
    let ctrl = this;
    let category = req.object;
    category.years = req.body.years;
    category.periods = req.body.periods;
    console.log(category);
    category.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: ctrl.getErrorMessage(err)
          });
        } else {
          res.json(category);
        }
    });
  }

}
