System.register(["./account.class"], function(exports_1) {
    var account_class_1;
    var Tx;
    return {
        setters:[
            function (account_class_1_1) {
                account_class_1 = account_class_1_1;
            }],
        execute: function() {
            Tx = (function () {
                function Tx() {
                    this.ownAccount = new account_class_1.Account();
                    this.thirdPartyAccount = new account_class_1.Account();
                }
                return Tx;
            })();
            exports_1("Tx", Tx);
        }
    }
});
