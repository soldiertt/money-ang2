import * as fs from "fs";
import * as path from "path";
import * as readEachLine from "read-each-line";

export default class CsvFilesCtrl {

  readLines(req, res) {
    let rootPath = this.getRootPath(req),
      startsWith = req.query.startsWith,
      headerLinesCount = req.query.headerLinesCount,
      csvLines = [];
    fs.readdir(rootPath, function (err, files) {
      if (err) throw err;
      files.forEach(function (name) {
        let filePath = path.join(rootPath, name);
        let stat = fs.statSync(filePath);
        if (stat.isFile() && name.indexOf(startsWith) === 0 && name.indexOf(".csv") === (name.length - 4)) {
          console.log("reading", filePath);
          let linenumber = 0;
          readEachLine(filePath, "utf8", function(line) {
            if (++linenumber > headerLinesCount) {
              csvLines.push(line);
            }
          });
        }
      });
      res.json(csvLines);
    });
  }

  listNames(req, res) {
    let rootPath: string = this.getRootPath(req),
      fileNames: Array<string> = [];
    fs.readdir(rootPath, function (err, files) {
      if (err) throw err;
      files.forEach(function (name) {
        let filePath: string = path.join(rootPath, name);
        let stat = fs.statSync(filePath);
        if (stat.isFile() && name.indexOf(".csv") === (name.length - 4)) {
          fileNames.push(name);
        }
      });
      res.json(fileNames);
    });
  }

  getDefaultPath(req, res) {
    let response = { path: fs.realpathSync("uploads/csv/") };
    res.json(response);
  }

  deleteFile(req, res) {
    let fileName = req.params.fileName;
    let rootPath = fs.realpathSync("uploads/csv/");
    fs.unlink(path.join(rootPath, fileName), () => {
      console.log("File deleted", fileName);
    });
    let response = { status: "ok" };
    res.json(response);
  }

  private getRootPath(req): string {
    let rootPath: string = req.query.rootPath;
    if (!rootPath) {
      rootPath = fs.realpathSync("uploads/csv/");
    }
    return rootPath;
  }

}
