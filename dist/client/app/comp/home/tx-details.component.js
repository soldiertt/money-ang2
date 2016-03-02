System.register(['angular2/core', '../../model/core/category.class', '../../service/category-rest.service', '../../service/txref-rest.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, category_class_1, category_rest_service_1, txref_rest_service_1;
    var TxDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (category_class_1_1) {
                category_class_1 = category_class_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (txref_rest_service_1_1) {
                txref_rest_service_1 = txref_rest_service_1_1;
            }],
        execute: function() {
            TxDetailsComponent = (function () {
                function TxDetailsComponent(_categoryRestService, _txrefRestService) {
                    this._categoryRestService = _categoryRestService;
                    this._txrefRestService = _txrefRestService;
                    this.txDeletedEmitter = new core_1.EventEmitter();
                }
                TxDetailsComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                TxDetailsComponent.prototype.onDeleteTx = function (tx) {
                    var _this = this;
                    this._categoryRestService.removeTx(this.period.id, tx).subscribe(function (res) {
                        console.log("tx removed");
                        _this.txDeletedEmitter.emit([_this.period, tx]);
                    });
                    this._txrefRestService.deleteByTxref(tx.ref).subscribe(function (res) {
                        console.log("txref removed");
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TxDetailsComponent.prototype, "txList", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', category_class_1.Period)
                ], TxDetailsComponent.prototype, "period", void 0);
                __decorate([
                    core_1.Output('txDeleted'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TxDetailsComponent.prototype, "txDeletedEmitter", void 0);
                TxDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'money-tx-details',
                        templateUrl: 'html/home/tx-details.html'
                    }), 
                    __metadata('design:paramtypes', [category_rest_service_1.CategoryRestService, txref_rest_service_1.TxrefRestService])
                ], TxDetailsComponent);
                return TxDetailsComponent;
            })();
            exports_1("TxDetailsComponent", TxDetailsComponent);
        }
    }
});
