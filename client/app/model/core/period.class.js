System.register([], function(exports_1) {
    var Period;
    return {
        setters:[],
        execute: function() {
            Period = (function () {
                function Period() {
                    this.total = 0;
                }
                Period.prototype.addTx = function (tx) {
                    this.tx.push(tx);
                    this.total += tx.amount;
                };
                return Period;
            })();
            exports_1("Period", Period);
        }
    }
});
