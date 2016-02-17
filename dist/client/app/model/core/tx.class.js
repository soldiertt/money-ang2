System.register([], function(exports_1) {
    var Account, Tx;
    return {
        setters:[],
        execute: function() {
            Account = (function () {
                function Account() {
                }
                return Account;
            })();
            Tx = (function () {
                function Tx() {
                    this.ownAccount = new Account();
                    this.thirdPartyAccount = new Account();
                }
                return Tx;
            })();
            exports_1("Tx", Tx);
        }
    }
});
