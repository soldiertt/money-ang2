var preferenceCtrl = require('../ctrl/preference.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/preference')
        .get(preferenceCtrl.list)
        .post(preferenceCtrl.create);
    app.route('/restapi/preference/:preferenceId')
        .get(preferenceCtrl.read)
        .put(preferenceCtrl.update)
        .delete(preferenceCtrl.delete);
    app.param('preferenceId', preferenceCtrl.findByID);
};
