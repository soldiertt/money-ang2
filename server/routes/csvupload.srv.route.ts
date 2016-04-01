import CsvUploadCtrl from '../ctrl/csvupload.srv.ctrl';
import * as multer from 'multer';

export default function (app) {
  let upload = multer({ dest: 'uploads/' });
  let csvUploadCtrl = new CsvUploadCtrl();
  app.route('/upload')
    .post(upload.single('csvfile'), (req, res) => { csvUploadCtrl.upload(req, res); });
};
