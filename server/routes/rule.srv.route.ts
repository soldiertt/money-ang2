import RuleCtrl from "../ctrl/rule.srv.ctrl";

export default function (app) {
  let ruleCtrl = new RuleCtrl();
  app.route("/restapi/rule")
    .get((req, res) => { ruleCtrl.list(req, res); })
    .post((req, res) => { ruleCtrl.create(req, res); });
  app.route("/restapi/rule/:ruleId")
    .get((req, res) => { ruleCtrl.read(req, res); })
    .put((req, res) => { ruleCtrl.update(req, res); })
    .delete((req, res) => { ruleCtrl.delete(req, res); });
  app.param("ruleId", (req, res, next, id) => { ruleCtrl.findByID(req, res, next, id); });
};
