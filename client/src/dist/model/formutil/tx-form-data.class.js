System.register(["../core/money-enums"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var money_enums_1, CategoryLink, TxFormData;
    return {
        setters: [
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            }
        ],
        execute: function () {
            CategoryLink = (function () {
                function CategoryLink() {
                    this.categoryId = "";
                }
                return CategoryLink;
            }());
            TxFormData = (function () {
                function TxFormData(tx) {
                    this.tx = tx;
                    if (tx.amount < 0) {
                        this.categoryType = money_enums_1.CatType.OTHER;
                    }
                    else {
                        this.categoryType = money_enums_1.CatType.INCOMING;
                    }
                    this.categoryFrequency = money_enums_1.CatFrequency.MONTHLY;
                    this.categoryLink = new CategoryLink();
                    this.resetComptaDate();
                }
                TxFormData.prototype.resetComptaDate = function () {
                    this.comptaDate = false;
                    // Set default compta month and year to one month ago from tx date (most current)
                    var txDate = new Date(this.tx.date.getTime());
                    var oneMonthAgoDate = new Date(txDate.setMonth(txDate.getMonth() - 1));
                    this.comptaMonth = oneMonthAgoDate.getMonth();
                    this.comptaYear = oneMonthAgoDate.getFullYear();
                };
                return TxFormData;
            }());
            exports_1("TxFormData", TxFormData);
        }
    };
});
//# sourceMappingURL=tx-form-data.class.js.map