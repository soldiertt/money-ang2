System.register(['../core/category-type.enum', '../core/category-frequency.enum', './category-link.class'], function(exports_1) {
    var category_type_enum_1, category_frequency_enum_1, category_link_class_1;
    var TxFormData;
    return {
        setters:[
            function (category_type_enum_1_1) {
                category_type_enum_1 = category_type_enum_1_1;
            },
            function (category_frequency_enum_1_1) {
                category_frequency_enum_1 = category_frequency_enum_1_1;
            },
            function (category_link_class_1_1) {
                category_link_class_1 = category_link_class_1_1;
            }],
        execute: function() {
            TxFormData = (function () {
                function TxFormData(tx) {
                    this.tx = tx;
                    if (tx.amount < 0) {
                        this.categoryType = category_type_enum_1.CatType.OTHER;
                    }
                    else {
                        this.categoryType = category_type_enum_1.CatType.INCOMING;
                    }
                    this.categoryFrequency = category_frequency_enum_1.CatFrequency.MONTHLY;
                    this.categoryLink = new category_link_class_1.CategoryLink();
                    this.resetComptaDate();
                }
                TxFormData.prototype.resetComptaDate = function () {
                    this.comptaDate = false;
                    //Set default compta month and year to one month ago (most current)
                    var now = new Date();
                    var oneMonthAgoDate = new Date(now.setMonth(now.getMonth() - 1));
                    this.comptaMonth = oneMonthAgoDate.getMonth();
                    this.comptaYear = oneMonthAgoDate.getFullYear();
                };
                return TxFormData;
            })();
            exports_1("TxFormData", TxFormData);
        }
    }
});
