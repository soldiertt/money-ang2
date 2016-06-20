"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var CategoryCtrl = (function (_super) {
    __extends(CategoryCtrl, _super);
    function CategoryCtrl() {
        var categoryModel = mongoose.model("Category");
        _super.call(this, categoryModel, "Category");
    }
    CategoryCtrl.prototype.addTx = function (req, res) {
        var tx = req.body.tx;
        var catLink = req.body.categoryLink;
        this.objectModel.update({ _id: catLink.categoryId,
            periods: {
                $elemMatch: { year: catLink.categoryYear, index: catLink.periodIndex }
            }
        }, {
            $push: { "periods.$.txList": tx },
            $inc: { "periods.$.total": tx.amount }
        }, function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(tx);
            }
        });
    };
    CategoryCtrl.prototype.removeTx = function (req, res) {
        var tx = req.body;
        var periodId = req.params.periodId;
        this.objectModel.update({ "periods._id": periodId }, {
            $pull: { "periods.$.txList": { _id: tx.id } },
            $inc: { "periods.$.total": -tx.amount }
        }, function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(tx);
            }
        });
    };
    CategoryCtrl.prototype.updatePeriodMarkAsPaid = function (req, res) {
        var categoryId = req.body.categoryId;
        var periodId = req.body.periodId;
        var markAsPaid = req.body.markAsPaid;
        this.objectModel.findOneAndUpdate({ "_id": categoryId, "periods._id": periodId }, {
            "$set": {
                "periods.$.markAsPaid": markAsPaid
            }
        }, function (err, doc) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(doc);
            }
        });
    };
    CategoryCtrl.prototype.search = function (req, res) {
        var year = req.query.year;
        if (req.query.id) {
            // Make sure the specific category exists within a specific year
            var catId = req.query.id;
            this.objectModel.findOne({ _id: catId, years: year }).exec(function (err, category) {
                if (err) {
                    return res.status(400).send({
                        message: this.getErrorMessage(err)
                    });
                }
                else {
                    res.json(category);
                }
            });
        }
        else {
            // Find all categories for a specific year
            this.objectModel.find({ years: year }, "-periods.txList").exec(function (err, categories) {
                if (err) {
                    return res.status(400).send({
                        message: this.getErrorMessage(err)
                    });
                }
                else {
                    res.json(categories);
                }
            });
        }
    };
    CategoryCtrl.prototype.searchTx = function (req, res) {
        var categoryId = req.query.categoryId;
        var years = req.query.years;
        var periodId = req.query.periodId;
        if (categoryId && years) {
            // Check if category contains any Tx for a array of years
            this.objectModel.findOne({
                _id: categoryId,
                periods: {
                    $elemMatch: { year: { $in: years },
                        txList: { $exists: true, $ne: [] }
                    }
                }
            }, function (err, category) {
                if (err) {
                    return res.status(400).send({
                        message: this.getErrorMessage(err)
                    });
                }
                else {
                    res.json(category);
                }
            });
        }
        else if (categoryId && periodId) {
            // Retrieve all Tx for a given period.
            console.log("find Tx for given category and period", categoryId, periodId);
            this.objectModel.findOne({ _id: categoryId, "periods._id": periodId }, { "periods.$": 1 }, function (err, category) {
                if (err) {
                    return res.status(400).send({
                        message: this.getErrorMessage(err)
                    });
                }
                else {
                    res.json(category);
                }
            });
        }
    };
    CategoryCtrl.prototype.update = function (req, res) {
        var category = req.object;
        category.years = req.body.years;
        category.periods = req.body.periods;
        console.log(category);
        category.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(category);
            }
        });
    };
    return CategoryCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CategoryCtrl;
//# sourceMappingURL=category.srv.ctrl.js.map