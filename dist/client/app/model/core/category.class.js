System.register(['./money-enums'], function(exports_1) {
    var money_enums_1;
    var Period, Category;
    return {
        setters:[
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            }],
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
            Category = (function () {
                function Category(name, type, frequency, years) {
                    this.name = name;
                    this.type = type;
                    this.frequency = frequency;
                    this.years = years;
                    this.nbPeriods = this._getNbPeriods();
                    this.periods = [];
                    for (var i = 0; i < years.length; i++) {
                        for (var j = 0; j < this.nbPeriods; j++) {
                            this.periods.push(new Period(years[i], j));
                        }
                    }
                }
                Category.prototype._getNbPeriods = function () {
                    switch (this.frequency) {
                        case money_enums_1.CatFrequency.MONTHLY:
                            return 12;
                        case money_enums_1.CatFrequency.QUARTER:
                            return 4;
                        case money_enums_1.CatFrequency.YEARLY:
                            return 1;
                    }
                };
                return Category;
            })();
            exports_1("Category", Category);
        }
    }
});