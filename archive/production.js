module.exports = {
    sessionSecret: 'productionSessionSecret',
    db: 'mongodb://admin:THVtih7CgW-a@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/moneyv2',
    viewEngine: 'ejs'
};
