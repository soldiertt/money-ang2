var csvuploadCtrl = require('../ctrl/csvupload.srv.ctrl');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
    app.route('/upload')
        .post(upload.single('csvfile'), csvuploadCtrl.upload);
};
