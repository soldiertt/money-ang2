process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./server/config/mongoose'),
    express = require('./server/config/express');

var db = mongoose(),
    app = express(db),
    port = 3000,
    ipaddress = "127.0.0.1";

app.listen(port, ipaddress);
module.exports = app;
console.log('Server running at http://' + ipaddress + ':' + port + '/');
