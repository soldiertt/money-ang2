import * as mongoose from 'mongoose';
import BasicCrudCtrl from './basic-crud.srv.ctrl';

export default class RuleCtrl extends BasicCrudCtrl {

  constructor() {
    let Rule = mongoose.model('Rule');
    super(Rule, 'Rule');
  }

  update (req, res) {
    let rule = req.object;
    rule.name = req.body.name;
    rule.conditions = req.body.conditions;
    rule.categoryId = req.body.categoryId;
    rule.isActive = req.body.isActive;
    rule.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: this.getErrorMessage(err)
        });
      } else {
        res.json(rule);
      }
    });
  }

  list (req, res) {
    let queryObj = {};
    this.objectModel.find(queryObj).populate('categoryId', '-periods').lean().exec(function (err, objectList) {
      if (err) {
        return res.status(400).send({
          message: this.getErrorMessage(err)
        });
      } else {
        objectList = objectList.map(function(elem) {
          elem.id = elem._id;
          elem.category = elem.categoryId; // id was populated with object
          elem.categoryId = elem.category._id;
          return elem;
        });
        res.json(objectList);
      }
    });
  }
}
