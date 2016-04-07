import FilterPresetCtrl from '../ctrl/filter-preset.srv.ctrl';

export default function (app) {
  let filterPresetCtrl = new FilterPresetCtrl();
  app.route('/restapi/filterpreset')
    .get((req, res) => { filterPresetCtrl.list(req, res); })
    .post((req, res) => { filterPresetCtrl.create(req, res); });
  app.route('/restapi/filterpreset/:presetId')
    .get((req, res) => { filterPresetCtrl.read(req, res); })
    .put((req, res) => { filterPresetCtrl.update(req, res); })
    .delete((req, res) => { filterPresetCtrl.delete(req, res); });
  app.param('presetId', (req, res, next, id) => { filterPresetCtrl.findByID(req, res, next, id); });
};
