System.register(['angular2/core', '../../model/utils/tx-mapper.class', '../../service/preference-rest.service', '../../service/account-setting-rest.service', '../../service/category-rest.service', '../../service/csv-reader-rest.service', '../../service/tx-rest.service', '../../model/core/category-type.enum', '../../model/core/category-frequency.enum', '../../model/formutil/tx-form-data.class', '../../pipe/catfilter-pipe', '../../pipe/tx-sorter-pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tx_mapper_class_1, preference_rest_service_1, account_setting_rest_service_1, category_rest_service_1, csv_reader_rest_service_1, tx_rest_service_1, category_type_enum_1, category_frequency_enum_1, tx_form_data_class_1, catfilter_pipe_1, tx_sorter_pipe_1;
    var ImportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tx_mapper_class_1_1) {
                tx_mapper_class_1 = tx_mapper_class_1_1;
            },
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            },
            function (account_setting_rest_service_1_1) {
                account_setting_rest_service_1 = account_setting_rest_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (csv_reader_rest_service_1_1) {
                csv_reader_rest_service_1 = csv_reader_rest_service_1_1;
            },
            function (tx_rest_service_1_1) {
                tx_rest_service_1 = tx_rest_service_1_1;
            },
            function (category_type_enum_1_1) {
                category_type_enum_1 = category_type_enum_1_1;
            },
            function (category_frequency_enum_1_1) {
                category_frequency_enum_1 = category_frequency_enum_1_1;
            },
            function (tx_form_data_class_1_1) {
                tx_form_data_class_1 = tx_form_data_class_1_1;
            },
            function (catfilter_pipe_1_1) {
                catfilter_pipe_1 = catfilter_pipe_1_1;
            },
            function (tx_sorter_pipe_1_1) {
                tx_sorter_pipe_1 = tx_sorter_pipe_1_1;
            }],
        execute: function() {
            ImportComponent = (function () {
                function ImportComponent(_prefRestService, _accountSettingRestService, _csvReaderRestService, _txRestService, _categoryRestService) {
                    var _this = this;
                    this._prefRestService = _prefRestService;
                    this._accountSettingRestService = _accountSettingRestService;
                    this._csvReaderRestService = _csvReaderRestService;
                    this._txRestService = _txRestService;
                    this._categoryRestService = _categoryRestService;
                    this.pendingTxList = [];
                    this.pendingRefList = [];
                    this.txFormDataMap = new Map();
                    this.months = [{ value: 0, name: "January" }, { value: 1, name: "February" }, { value: 2, name: "March" },
                        { value: 3, name: "April" }, { value: 4, name: "May" }, { value: 5, name: "June" },
                        { value: 6, name: "July" }, { value: 7, name: "Augustus" }, { value: 8, name: "September" },
                        { value: 9, name: "October" }, { value: 10, name: "November" }, { value: 11, name: "December" }];
                    this.years = [2014, 2015, 2016];
                    this._prefRestService.getPref().subscribe(function (preference) {
                        _this._categoryRestService.listForYear(preference.workingYear).subscribe(function (categories) {
                            _this.yearCategories = categories;
                        });
                        _this._accountSettingRestService.list().subscribe(function (accounts) {
                            accounts.forEach(function (account) {
                                _this._csvReaderRestService.list(preference.csvPath, account.fileStartsWith, account.headerLinesCount).subscribe(function (csvLines) {
                                    csvLines.forEach(function (csvLine) {
                                        var tx = tx_mapper_class_1.TxMapper.mapLineToTx(csvLine, account);
                                        _this._txRestService.readByRef(tx.ref).subscribe(function (foundTx) {
                                            if (!foundTx && _this.pendingRefList.indexOf(tx.ref) == -1) {
                                                _this.pendingTxList.push(tx);
                                                _this.pendingTxList = _this.pendingTxList.slice(0); //Hack to force change detection
                                                _this.pendingRefList.push(tx.ref);
                                                _this.txFormDataMap.set(tx.ref, new tx_form_data_class_1.TxFormData(tx.amount));
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                ImportComponent.prototype.catTypeChanged = function ($event, ref) {
                    this.txFormDataMap.get(ref).categoryType = category_type_enum_1.CatType[$event.target.value];
                };
                ImportComponent.prototype.catFrequencyChanged = function ($event, ref) {
                    this.txFormDataMap.get(ref).categoryFrequency = category_frequency_enum_1.CatFrequency[$event.target.value];
                };
                ImportComponent.prototype.comptaDateChanged = function ($event, ref) {
                    var txFormData = this.txFormDataMap.get(ref);
                    if ($event.target.checked) {
                        txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
                    }
                    else {
                        txFormData.resetComptaDate();
                    }
                };
                ImportComponent.prototype.comptaMonthChanged = function ($event, ref) {
                    var txFormData = this.txFormDataMap.get(ref);
                    txFormData.comptaMonth = $event.target.value;
                    txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
                };
                ImportComponent.prototype.comptaYearChanged = function ($event, ref) {
                    var txFormData = this.txFormDataMap.get(ref);
                    txFormData.comptaYear = $event.target.value;
                    txFormData.comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
                };
                ImportComponent.prototype.display = function () {
                    console.log(this.txFormDataMap);
                };
                ImportComponent = __decorate([
                    core_1.Component({
                        selector: 'money-import',
                        templateUrl: 'app/view/import/index.html',
                        directives: [],
                        pipes: [catfilter_pipe_1.CatfilterPipe, tx_sorter_pipe_1.TxSorterPipe]
                    }), 
                    __metadata('design:paramtypes', [preference_rest_service_1.PreferenceRestService, account_setting_rest_service_1.AccountSettingRestService, csv_reader_rest_service_1.CsvReaderRestService, tx_rest_service_1.TxRestService, category_rest_service_1.CategoryRestService])
                ], ImportComponent);
                return ImportComponent;
            })();
            exports_1("ImportComponent", ImportComponent);
        }
    }
});
