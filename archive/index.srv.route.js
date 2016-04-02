var indexCtrl = require('../ctrl/index.srv.ctrl.js');

module.exports = function(app) {
    app.get('/', indexCtrl.render);
};
