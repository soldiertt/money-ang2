var accountSettingCtrl = require('../ctrl/account-setting.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/account-setting')
        .get(accountSettingCtrl.list)
        .post(accountSettingCtrl.create);
    app.route('/restapi/account-setting/:accountSettingId')
        .get(accountSettingCtrl.read)
        .put(accountSettingCtrl.update)
        .delete(accountSettingCtrl.delete);
    app.param('accountSettingId', accountSettingCtrl.findByID);
};
