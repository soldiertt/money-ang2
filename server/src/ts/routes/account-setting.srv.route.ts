import AccountSettingCtrl from "../ctrl/account-setting.srv.ctrl";

export default function (app) {
  let accountSettingCtrl = new AccountSettingCtrl();
  app.route("/restapi/account-setting")
    .get((req, res) => { accountSettingCtrl.list(req, res); })
    .post((req, res) => { accountSettingCtrl.create(req, res); });
  app.route("/restapi/account-setting/:accountSettingId")
    .get((req, res) => { accountSettingCtrl.read(req, res); })
    .put((req, res) => { accountSettingCtrl.update(req, res); })
    .delete((req, res) => { accountSettingCtrl.delete(req, res); });
  app.param("accountSettingId", (req, res, next, id) => { accountSettingCtrl.findByID(req, res, next, id); });
};
