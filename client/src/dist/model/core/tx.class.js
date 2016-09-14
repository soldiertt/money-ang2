System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Account, Tx;
    return {
        setters: [],
        execute: function () {
            Account = (function () {
                function Account() {
                }
                return Account;
            }());
            Tx = (function () {
                function Tx() {
                    this.ownAccount = new Account();
                    this.thirdPartyAccount = new Account();
                }
                return Tx;
            }());
            exports_1("Tx", Tx);
        }
    };
});
//# sourceMappingURL=tx.class.js.map