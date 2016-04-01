import PreferenceCtrl from '../ctrl/preference.srv.ctrl';

export default function (app) {
  let preferenceCtrl = new PreferenceCtrl();
  app.route('/restapi/preference')
    .get((req, res) => { preferenceCtrl.list(req, res); })
    .post((req, res) => { preferenceCtrl.create(req, res); });
  app.route('/restapi/preference/:preferenceId')
    .get((req, res) => { preferenceCtrl.read(req, res); })
    .put((req, res) => { preferenceCtrl.update(req, res); })
    .delete((req, res) => { preferenceCtrl.delete(req, res); });
  app.param('preferenceId', (req, res, next, id) => { preferenceCtrl.findByID(req, res, next, id); });
};
