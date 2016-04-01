import * as fs from 'fs';
import * as path from 'path';
import * as readEachLine from 'read-each-line';

export default class CsvReaderCtrl {

  list (req, res) {
    let rootPath = req.query.rootPath,
      startsWith = req.query.startsWith,
      headerLinesCount = req.query.headerLinesCount,
      csvLines = [];
    fs.readdir(rootPath, function (err, files) {
      if (err) throw err;
      files.forEach(function (name) {
        let filePath = path.join(rootPath, name);
        let stat = fs.statSync(filePath);
        if (stat.isFile() && name.indexOf(startsWith) == 0 && name.indexOf(".csv") == (name.length - 4)) {
          console.log("reading",filePath);
          let linenumber = 0;
          readEachLine(filePath, 'utf8', function(line) {
            if (++linenumber > headerLinesCount) {
              csvLines.push(line);
            }
          })
        }
      });
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(csvLines));
    });
  }
}
