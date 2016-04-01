import * as mongoose from 'mongoose';
import BasicCrudCtrl from './basic-crud.srv.ctrl';

export default class AccountSettingCtrl extends BasicCrudCtrl {

  constructor() {
    let AccountSetting = mongoose.model('AccountSetting');
    super(AccountSetting, 'AccountSetting');
  }

  update(req, res) {
    var accountSetting = req.accountSetting;
    accountSetting.name = req.body.name;
    accountSetting.accountNumber = req.body.accountNumber;
    accountSetting.headerLinesCount = req.body.headerLinesCount;
    accountSetting.fieldSeparator = req.body.fieldSeparator;
    accountSetting.fieldMappings = req.body.fieldMappings;
    accountSetting.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: this.getErrorMessage(err)
            });
        } else {
            res.json(accountSetting);
        }
    });
  }
}
