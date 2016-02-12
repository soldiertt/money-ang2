var Preference = require('mongoose').model('Preference'),
    basicCrudCtrl = require('./basic-crud.srv.ctrl')(Preference);

basicCrudCtrl.update = function (req, res) {
    var preference = req.object;
    preference.csvPath = req.body.csvPath;
    preference.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(preference);
        }
    });
};

module.exports = basicCrudCtrl;
