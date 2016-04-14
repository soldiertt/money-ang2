import * as readEachLine from "read-each-line";
import * as multer from "multer";

export default class CsvUploadCtrl {

  private fileFilter(req, file, cb) {
    if (file.originalname.indexOf(".csv") === file.originalname.length - 4) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  getMulterMiddleware(dest: string, useOrginalFileName: boolean) {
    let storageOptions: any = {
      destination: function (req, file, cb) {
        cb(null, dest);
      }
    };
    if (useOrginalFileName) {
      storageOptions.filename = function (req, file, cb) {
        let suffix = "-" +  Date.now() + ".csv";
        cb(null, file.originalname.substring(0, file.originalname.length - 4) + suffix);
      };
    }
    let storage = multer.diskStorage(storageOptions);
    let multerConfig = multer({ storage: storage, fileFilter: this.fileFilter });
    return multerConfig.single("csvfile");
  }

  uploadSample(req, res) {
    let tmp_path = req.file.path;
    let firstlines = [],
        maxlines = 15,
        linenumber = 0;
    readEachLine(tmp_path, "utf8", function(line) {
      if (++linenumber <= maxlines) {
        firstlines.push(line);
      }
    });
    res.json(firstlines);
  }

  uploadCsv(req, res) {
    let response = { status: "ok", fileName : req.file.filename };
    res.json(response);
  }

}
