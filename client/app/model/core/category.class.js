System.register(['./period.class', './category-frequency.enum'], function(exports_1) {
    var period_class_1, category_frequency_enum_1;
    var Category;
    return {
        setters:[
            function (period_class_1_1) {
                period_class_1 = period_class_1_1;
            },
            function (category_frequency_enum_1_1) {
                category_frequency_enum_1 = category_frequency_enum_1_1;
            }],
        execute: function() {
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
                            this.periods.push(new period_class_1.Period(years[i], j));
                        }
                    }
                }
                Category.prototype._getNbPeriods = function () {
                    switch (this.frequency) {
                        case category_frequency_enum_1.CatFrequency.MONTHLY:
                            return 12;
                        case category_frequency_enum_1.CatFrequency.QUARTER:
                            return 4;
                        case category_frequency_enum_1.CatFrequency.YEARLY:
                            return 1;
                    }
                };
                return Category;
            })();
            exports_1("Category", Category);
        }
    }
});
