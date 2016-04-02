var csvReaderCtrl = require('../ctrl/csvreader.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/csvreader')
        .get(csvReaderCtrl.list);
};
