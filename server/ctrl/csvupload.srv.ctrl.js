var readEachLine = require('read-each-line');

exports.upload = function (req, res) {
   console.log(req.file);
   var tmp_path = req.file.path;
   var firstlines = [],
        maxlines = 10,
        linenumber = 0;
   readEachLine(tmp_path, 'utf8', function(line) {
     if (++linenumber <= maxlines) {
       firstlines.push(line);
     }
   })
   res.writeHead(200, {"Content-Type": "application/json"});
   res.end(JSON.stringify(firstlines));
};
