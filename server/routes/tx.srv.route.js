var txCtrl = require('../ctrl/tx.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/tx')
        .get(txCtrl.list)
        .post(txCtrl.create);
    app.route('/restapi/tx/:txId')
        .get(txCtrl.read)
        .put(txCtrl.update)
        .delete(txCtrl.delete);
    app.route('/restapi/tx/ref/:txRef')
        .get(txCtrl.readByRef);
    app.param('txId', txCtrl.findByID);
    app.param('txRef', txCtrl.findByRef);
};
