var categoryCtrl = require('../ctrl/category.srv.ctrl');

module.exports = function (app) {
    app.route('/restapi/category')
      .get(categoryCtrl.list)
      .post(categoryCtrl.create);
    app.route('/restapi/category/search')
      .get(categoryCtrl.search);
    app.route('/restapi/category/:categoryId')
      .get(categoryCtrl.read)
      .put(categoryCtrl.update)
      .delete(categoryCtrl.delete);
    app.param('categoryId', categoryCtrl.categoryByID);
};
