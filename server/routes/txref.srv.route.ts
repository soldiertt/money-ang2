import TxrefCtrl from "../ctrl/txref.srv.ctrl";

export default function (app) {
  let txrefCtrl = new TxrefCtrl();
  app.route("/restapi/txref")
    .post((req, res) => { txrefCtrl.create(req, res); });
  app.route("/restapi/txref/find")
    .get((req, res) => { txrefCtrl.find(req, res); });
  app.route("/restapi/txref/:txref")
    .get((req, res) => { txrefCtrl.read(req, res); })
    .delete((req, res) => { txrefCtrl.delete(req, res); });
  app.param("txref", (req, res, next, ref) => { txrefCtrl.findByRef(req, res, next, ref); });
};
