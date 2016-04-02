var fs = require('fs'),
    path = require('path'),
    readEachLine = require('read-each-line');

exports.list = function(req, res) {
  var rootPath = req.query.rootPath,
      startsWith = req.query.startsWith,
      headerLinesCount = req.query.headerLinesCount,
      csvLines = [];
  fs.readdir(rootPath, function (err, files) {
    if (err) throw err;
    files.forEach(function (name) {
      var filePath = path.join(rootPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile() && name.indexOf(startsWith) == 0 && name.indexOf(".csv") == (name.length - 4)) {
        console.log("reading",filePath);
        var linenumber = 0;
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
