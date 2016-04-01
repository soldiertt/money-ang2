import CsvReaderCtrl from '../ctrl/csvreader.srv.ctrl';

export default function (app) {
  let csvReaderCtrl = new CsvReaderCtrl();
  app.route('/restapi/csvreader')
    .get((req, res) => { csvReaderCtrl.list(req, res); });
};
