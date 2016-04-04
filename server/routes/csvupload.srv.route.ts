import CsvUploadCtrl from '../ctrl/csvupload.srv.ctrl';

export default function (app) {
  let csvUploadCtrl = new CsvUploadCtrl();
  app.route('/uploadsample')
    .post(csvUploadCtrl.getMulterMiddleware('uploads/sample', false), (req, res) => { csvUploadCtrl.uploadSample(req, res); });
  app.route('/uploadcsv')
    .post(csvUploadCtrl.getMulterMiddleware('uploads/csv', true), (req, res) => { csvUploadCtrl.uploadCsv(req, res); });
};
