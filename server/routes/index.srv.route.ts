import * as indexCtrl from '../ctrl/index.srv.ctrl';

export default function(app) {
    app.get('/', indexCtrl.render);
};
