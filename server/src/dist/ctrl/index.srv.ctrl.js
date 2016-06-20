"use strict";
function render(req, res) {
    if (process.env.NODE_ENV === "development") {
        res.render("index", {
            title: "Money V2"
        });
    }
    else if (process.env.NODE_ENV === "production") {
        res.render("index-prod", {
            title: "Money V2"
        });
    }
}
exports.render = render;
;
//# sourceMappingURL=index.srv.ctrl.js.map