import CsvFileCtrl from "../ctrl/csvfiles.srv.ctrl";

export default function (app) {
  let csvFilesCtrl = new CsvFileCtrl();
  app.route("/restapi/csv/getlines")
    .get((req, res) => { csvFilesCtrl.readLines(req, res); });
  app.route("/restapi/csv/getnames")
    .get((req, res) => { csvFilesCtrl.listNames(req, res); });
  app.route("/restapi/csv/defaultpath")
    .get((req, res) => { csvFilesCtrl.getDefaultPath(req, res); });
  app.route("/restapi/csv/delete/:fileName")
    .delete((req, res) => { csvFilesCtrl.deleteFile(req, res); });
};
