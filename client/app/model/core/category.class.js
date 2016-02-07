System.register([], function(exports_1) {
    var Category;
    return {
        setters:[],
        execute: function() {
            Category = (function () {
                function Category(name, type, frequency, year, income) {
                    if (income === void 0) { income = false; }
                    this.name = name;
                    this.type = type;
                    this.frequency = frequency;
                    this.year = year;
                    this.income = income;
                    var occSize;
                    switch (frequency) {
                        case "MONTHLY":
                            occSize = 12;
                            break;
                        case "QUARTER":
                            occSize = 4;
                            break;
                        case "YEARLY":
                            occSize = 1;
                            break;
                    }
                    this.occSize = occSize;
                    this.periods = new Array(occSize);
                }
                return Category;
            })();
            exports_1("Category", Category);
        }
    }
});
