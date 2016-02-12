module.exports = function(ObjectModel, objectName) {
  var getErrorMessage = function (err) {
      var message = '',
          errName;

      if (err.code) {
          switch (err.code) {
              case 11000:
              case 11001:
                  message = objectName + ' already exists';
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

  var create = function (req, res) {
    var object = new ObjectModel(req.body);
      object.save(function (err) {
          if (err) {
              return res.status(400).send({
                  message: getErrorMessage(err)
              });
          } else {
              res.json(object);
          }
      });
  };

  var list = function (req, res) {
      var queryObj = {};

      ObjectModel.find(queryObj).exec(function (err, objectList) {
          if (err) {
              return res.status(400).send({
                  message: getErrorMessage(err)
              });
          } else {
              res.json(objectList);
          }
      });
  };

  var findByID = function (req, res, next, id) {
      ObjectModel.findById(id).exec(function (err, object) {
          if (err) {
              return next(err);
          }
          if (!object) {
              return next(new Error('Failed to load ' + objectName + ' ' + id));
          }
          req.object = object;
          next();
      });
  };

  var read = function (req, res) {
      res.json(req.object);
  };

  var deleteFn = function (req, res) {
      var object = req.object;
      object.remove(function (err) {
          if (err) {
              return res.status(400).send({
                  message: getErrorMessage(err)
              });
          } else {
              res.json(object);
          }
      });
  };

  return {
    create: create,
    list: list,
    findByID: findByID,
    read: read,
    delete: deleteFn
  };
};
