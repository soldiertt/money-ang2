var txrefCtrl = require('../ctrl/txref.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/txref')
        .post(txrefCtrl.create);
    app.route('/restapi/txref/ref/:txref')
        .get(txrefCtrl.read)
        .delete(txrefCtrl.delete);
    app.route('/restapi/txref/:txrefId')
        .get(txrefCtrl.readByRef);
    app.param('txrefId', txrefCtrl.findByID);
    app.param('txref', txrefCtrl.findByRef);
};
