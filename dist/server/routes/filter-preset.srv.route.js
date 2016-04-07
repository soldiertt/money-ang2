"use strict";
var filter_preset_srv_ctrl_1 = require('../ctrl/filter-preset.srv.ctrl');
function default_1(app) {
    var filterPresetCtrl = new filter_preset_srv_ctrl_1.default();
    app.route('/restapi/filterpreset')
        .get(function (req, res) { filterPresetCtrl.list(req, res); })
        .post(function (req, res) { filterPresetCtrl.create(req, res); });
    app.route('/restapi/filterpreset/:presetId')
        .get(function (req, res) { filterPresetCtrl.read(req, res); })
        .put(function (req, res) { filterPresetCtrl.update(req, res); })
        .delete(function (req, res) { filterPresetCtrl.delete(req, res); });
    app.param('presetId', function (req, res, next, id) { filterPresetCtrl.findByID(req, res, next, id); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
