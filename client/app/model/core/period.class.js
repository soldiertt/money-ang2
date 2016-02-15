System.register([], function(exports_1) {
    var Period;
    return {
        setters:[],
        execute: function() {
            Period = (function () {
                function Period(year, index) {
                    this.year = year;
                    this.index = index;
                    this.total = 0;
                    this.txList = [];
                }
                Period.prototype.addTx = function (tx) {
                    this.txList.push(tx);
                    this.total += tx.amount;
                };
                return Period;
            })();
            exports_1("Period", Period);
        }
    }
});
