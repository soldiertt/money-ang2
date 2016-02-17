System.register(['../core/money-enums'], function(exports_1) {
    var money_enums_1;
    var CategoryLink, TxFormData;
    return {
        setters:[
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            }],
        execute: function() {
            CategoryLink = (function () {
                function CategoryLink() {
                    this.categoryId = "";
                }
                return CategoryLink;
            })();
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
