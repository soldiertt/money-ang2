System.register([], function(exports_1) {
    var Tx;
    return {
        setters:[],
        execute: function() {
            Tx = (function () {
                function Tx(amount) {
                    this.amount = amount;
                }
                return Tx;
            })();
            exports_1("Tx", Tx);
        }
    }
});
