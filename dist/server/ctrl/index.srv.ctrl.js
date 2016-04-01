"use strict";
function render(req, res) {
    res.render('index', {
        title: 'Money V2'
    });
}
exports.render = render;
;
