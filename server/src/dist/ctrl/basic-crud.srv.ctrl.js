"use strict";
var BasicCrudCtrl = (function () {
    function BasicCrudCtrl(ObjectModel, objectName) {
        this.objectModel = ObjectModel;
        this.objectName = objectName;
    }
    BasicCrudCtrl.prototype.getErrorMessage = function (err) {
        var message = "", errName;
        if (err.code) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = this.objectName + " already exists";
                    break;
                default:
                    message = "Something went wrong";
            }
        }
        else if (err.errors) {
            for (errName in err.errors) {
                if (err.errors[errName].message) {
                    message = err.errors[errName].message;
                }
            }
        }
        else {
            message = "Unknown server error";
        }
        return message;
    };
    ;
    BasicCrudCtrl.prototype.create = function (req, res) {
        var object = new this.objectModel(req.body);
        object.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(object);
            }
        });
    };
    ;
    BasicCrudCtrl.prototype.list = function (req, res) {
        var queryObj = {};
        this.objectModel.find(queryObj).exec(function (err, objectList) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(objectList);
            }
        });
    };
    ;
    BasicCrudCtrl.prototype.findByID = function (req, res, next, id) {
        this.objectModel.findById(id).exec(function (err, object) {
            if (err) {
                return next(err);
            }
            if (!object) {
                return next(new Error("Failed to load " + this.objectName + " " + id));
            }
            req.object = object;
            next();
        });
    };
    ;
    BasicCrudCtrl.prototype.read = function (req, res) {
        res.json(req.object);
    };
    ;
    BasicCrudCtrl.prototype.delete = function (req, res) {
        var object = req.object;
        object.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(object);
            }
        });
    };
    ;
    return BasicCrudCtrl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BasicCrudCtrl;
;
