export default class BasicCrudCtrl {

  objectModel;
  objectName: string;

  constructor(ObjectModel, objectName: string) {
    this.objectModel = ObjectModel;
    this.objectName = objectName;
  }

  getErrorMessage(err) {
    let message: string = "",
        errName: string;

    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = this.objectName + " already exists";
          break;
        default:
          message = "Something went wrong";
      }
    } else if (err.errors) {
      for (errName in err.errors) {
        if (err.errors[errName].message) {
          message = err.errors[errName].message;
        }
      }
    } else {
      message = "Unknown server error";
    }
    return message;
  };

  create(req, res) {
    let ctrl = this;
    let object = new ctrl.objectModel(req.body);
    object.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: ctrl.getErrorMessage(err)
        });
      } else {
        res.json(object);
      }
    });
  };

  list(req, res) {
    let queryObj = {};
    let ctrl = this;
    ctrl.objectModel.find(queryObj).exec(function (err, objectList) {
      if (err) {
        return res.status(400).send({
          message: ctrl.getErrorMessage(err)
        });
      } else {
        res.json(objectList);
      }
    });
  };

  findByID (req, res, next, id) {
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

  read(req, res) {
    res.json(req.object);
  };

  delete(req, res) {
    let object = req.object;
    let ctrl = this;
    object.remove(function (err) {
      if (err) {
        return res.status(400).send({
          message: ctrl.getErrorMessage(err)
        });
      } else {
        res.json(object);
      }
    });
  };

};
