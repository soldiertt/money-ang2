exports.render = function (req, res) {
    res.render('index', {
        title: 'Money V2',
        user: JSON.stringify(req.user)
    });
};
