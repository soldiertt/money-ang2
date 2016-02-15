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
                    var occSize;
                    switch (frequency) {
                        case category_frequency_enum_1.CatFrequency.MONTHLY:
                            occSize = 12;
                            break;
                        case category_frequency_enum_1.CatFrequency.QUARTER:
                            occSize = 4;
                            break;
                        case category_frequency_enum_1.CatFrequency.YEARLY:
                            occSize = 1;
                            break;
                    }
                    this.periods = [];
                    for (var i = 0; i < years.length; i++) {
                        for (var j = 0; j < occSize; j++) {
                            this.periods.push(new period_class_1.Period(years[i], j));
                        }
                    }
                }
                return Category;
            })();
            exports_1("Category", Category);
        }
    }
});
