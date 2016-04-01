import * as readEachLine from 'read-each-line';

export default class csvUploadCtrl {

  upload(req, res) {
    console.log(req.file);
    let tmp_path = req.file.path;
    let firstlines = [],
        maxlines = 15,
        linenumber = 0;
    readEachLine(tmp_path, 'utf8', function(line) {
      if (++linenumber <= maxlines) {
        firstlines.push(line);
      }
    })
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(firstlines));
  }
  
}
