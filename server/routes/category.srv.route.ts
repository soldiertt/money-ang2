import CategoryCtrl from "../ctrl/category.srv.ctrl";

export default function (app) {
  let categoryCtrl = new CategoryCtrl();

  app.route("/restapi/category")
    .get((req, res) => { categoryCtrl.list(req, res); })
    .post((req, res) => { categoryCtrl.create(req, res); });
  app.route("/restapi/category/addtx")
    .post((req, res) => { categoryCtrl.addTx(req, res); });
  app.route("/restapi/category/removetx/:periodId")
    .post((req, res) => { categoryCtrl.removeTx(req, res); });
  app.route("/restapi/category/search")
    .get((req, res) => { categoryCtrl.search(req, res); });
  app.route("/restapi/tx/search")
    .get((req, res) => { categoryCtrl.searchTx(req, res); });
  app.route("/restapi/category/period/markAsPaid")
    .put((req, res) => { categoryCtrl.updatePeriodMarkAsPaid(req, res); });
  app.route("/restapi/category/:categoryId")
    .get((req, res) => { categoryCtrl.read(req, res); })
    .put((req, res) => { categoryCtrl.update(req, res); })
    .delete((req, res) => { categoryCtrl.delete(req, res); });
  app.param("categoryId", (req, res, next, id) => { categoryCtrl.findByID(req, res, next, id); });
};
