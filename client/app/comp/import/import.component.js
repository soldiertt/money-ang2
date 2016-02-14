System.register(['angular2/core', '../../model/utils/tx-mapper.class', '../../service/preference.service', '../../service/account-setting-rest.service', '../../service/csv-reader-rest.service', '../../service/tx-rest.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tx_mapper_class_1, preference_service_1, account_setting_rest_service_1, csv_reader_rest_service_1, tx_rest_service_1;
    var ImportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tx_mapper_class_1_1) {
                tx_mapper_class_1 = tx_mapper_class_1_1;
            },
            function (preference_service_1_1) {
                preference_service_1 = preference_service_1_1;
            },
            function (account_setting_rest_service_1_1) {
                account_setting_rest_service_1 = account_setting_rest_service_1_1;
            },
            function (csv_reader_rest_service_1_1) {
                csv_reader_rest_service_1 = csv_reader_rest_service_1_1;
            },
            function (tx_rest_service_1_1) {
                tx_rest_service_1 = tx_rest_service_1_1;
            }],
        execute: function() {
            ImportComponent = (function () {
                function ImportComponent(_prefService, _accountSettingRestService, _csvReaderRestService, _txRestService) {
                    var _this = this;
                    this._prefService = _prefService;
                    this._accountSettingRestService = _accountSettingRestService;
                    this._csvReaderRestService = _csvReaderRestService;
                    this._txRestService = _txRestService;
                    this.pendingTxList = [];
                    this.pendingRefList = [];
                    this._prefService.getPref("csvPath").subscribe(function (csvPath) {
                        _this._accountSettingRestService.list().subscribe(function (accounts) {
                            accounts.forEach(function (account) {
                                _this._csvReaderRestService.list(csvPath, account.fileStartsWith, account.headerLinesCount).subscribe(function (csvLines) {
                                    csvLines.forEach(function (csvLine) {
                                        var tx = tx_mapper_class_1.TxMapper.mapLineToTx(csvLine, account);
                                        _this._txRestService.readByRef(tx.ref).subscribe(function (foundTx) {
                                            if (!foundTx && _this.pendingRefList.indexOf(tx.ref) == -1) {
                                                _this.pendingTxList.push(tx);
                                                _this.pendingRefList.push(tx.ref);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                ImportComponent = __decorate([
                    core_1.Component({
                        selector: 'money-import',
                        templateUrl: 'app/view/import/index.html',
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [preference_service_1.PreferenceService, account_setting_rest_service_1.AccountSettingRestService, csv_reader_rest_service_1.CsvReaderRestService, tx_rest_service_1.TxRestService])
                ], ImportComponent);
                return ImportComponent;
            }());
            exports_1("ImportComponent", ImportComponent);
        }
    }
});
