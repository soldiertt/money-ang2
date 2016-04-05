import * as mongoose from 'mongoose';
import BasicCrudCtrl from './basic-crud.srv.ctrl';

export default class PreferenceCtrl extends BasicCrudCtrl {

  constructor() {
    let Preference = mongoose.model('Preference');
    super(Preference, 'Preference');
  }

  update (req, res) {
    var preference = req.object;
    preference.useDefaultCsvPath = req.body.useDefaultCsvPath;
    preference.csvPath = req.body.csvPath;
    preference.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: this.getErrorMessage(err)
        });
      } else {
        res.json(preference);
      }
    });
  }
}
