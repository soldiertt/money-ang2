import * as mongoose from 'mongoose';
import BasicCrudCtrl from './basic-crud.srv.ctrl';

export default class FilterPresetCtrl extends BasicCrudCtrl {

  constructor() {
    let FilterPreset = mongoose.model('FilterPreset');
    super(FilterPreset, 'FilterPreset');
  }

  update (req, res) {
    var preset = req.object;
    preset.name = req.body.name;
    preset.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: this.getErrorMessage(err)
        });
      } else {
        res.json(preset);
      }
    });
  }
}
