var ruleCtrl = require('../ctrl/rule.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/rule')
        .get(ruleCtrl.list)
        .post(ruleCtrl.create);
    app.route('/restapi/rule/:ruleId')
        .get(ruleCtrl.read)
        .put(ruleCtrl.update)
        .delete(ruleCtrl.delete);
    app.param('ruleId', ruleCtrl.findByID);
};
