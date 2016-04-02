var txrefCtrl = require('../ctrl/txref.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/txref')
      .post(txrefCtrl.create);
    app.route('/restapi/txref/find')
      .get(txrefCtrl.find);
    app.route('/restapi/txref/:txref')
      .get(txrefCtrl.read)
      .delete(txrefCtrl.delete);
    app.param('txref', txrefCtrl.findByRef);
};
