import * as mongoose from 'mongoose';
import BasicCrudCtrl from './basic-crud.srv.ctrl';

export default class TxrefCtrl extends BasicCrudCtrl {

  constructor() {
    let Txref = mongoose.model('Txref');
    super(Txref, 'Txref');
  }

  findByRef (req, res, next, ref) {
    this.objectModel.findOne({ref: ref}).exec(function (err, object) {
      if (err) {
        return next(err);
      }
      req.object = object;
      next();
    });
  }

  find (req, res) {
    let txrefList = req.query.txref;
    this.objectModel.find({
      ref: { $in: txrefList }
    }).exec(function (err, references) {
      if (err) {
        return res.status(400).send({
          message: this.getErrorMessage(err)
        });
      } else {
        res.json(references);
      }
    });
  }

}
