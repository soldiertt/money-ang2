System.register(['angular2/core', 'rxjs/add/operator/map', '../../model/core/money-enums', '../../model/core/txref.class', '../../model/utils/tx-mapper.class', '../../model/formutil/tx-form-data.class', '../../service/preference-rest.service', '../../service/account-setting-rest.service', '../../service/category-rest.service', '../../service/csv-reader-rest.service', '../../service/txref-rest.service', '../../service/form-utils.service', '../../pipe/money-pipes'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, money_enums_1, txref_class_1, tx_mapper_class_1, tx_form_data_class_1, preference_rest_service_1, account_setting_rest_service_1, category_rest_service_1, csv_reader_rest_service_1, txref_rest_service_1, form_utils_service_1, money_pipes_1;
    var ImportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            },
            function (txref_class_1_1) {
                txref_class_1 = txref_class_1_1;
            },
            function (tx_mapper_class_1_1) {
                tx_mapper_class_1 = tx_mapper_class_1_1;
            },
            function (tx_form_data_class_1_1) {
                tx_form_data_class_1 = tx_form_data_class_1_1;
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
            function (txref_rest_service_1_1) {
                txref_rest_service_1 = txref_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            ImportComponent = (function () {
                function ImportComponent(_prefRestService, _accountSettingRestService, _csvReaderRestService, _txrefRestService, _categoryRestService, _formUtilsService) {
                    this._prefRestService = _prefRestService;
                    this._accountSettingRestService = _accountSettingRestService;
                    this._csvReaderRestService = _csvReaderRestService;
                    this._txrefRestService = _txrefRestService;
                    this._categoryRestService = _categoryRestService;
                    this._formUtilsService = _formUtilsService;
                    this.txFormDataList = [];
                    this.refList = [];
                    this.months = this._formUtilsService.getAppMonths();
                    this.years = this._formUtilsService.getAppYears();
                }
                ImportComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._prefRestService.getPref().subscribe(function (preference) {
                        _this._categoryRestService.listForYear(preference.workingYear).subscribe(function (categories) {
                            _this.yearCategories = categories;
                        });
                        _this._accountSettingRestService.list().subscribe(function (accounts) {
                            accounts.forEach(function (account) {
                                _this._csvReaderRestService.list(preference.csvPath, account).subscribe(function (csvLines) {
                                    var txList = csvLines.map(function (csvLine) { return tx_mapper_class_1.TxMapper.mapLineToTx(csvLine, account); });
                                    txList.sort(function (a, b) {
                                        if (a.date > b.date) {
                                            return 1;
                                        }
                                        else if (a.date < b.date) {
                                            return -1;
                                        }
                                        else {
                                            return 0;
                                        }
                                    });
                                    txList.forEach(function (tx) {
                                        _this._txrefRestService.readByRef(tx.ref).subscribe(function (foundRef) {
                                            if (!foundRef && _this.refList.indexOf(tx.ref) == -1 && _this.txFormDataList.length < 10) {
                                                _this.txFormDataList.push(new tx_form_data_class_1.TxFormData(tx));
                                                _this.refList.push(tx.ref);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                };
                ImportComponent.prototype.catTypeChanged = function ($event, txFormData) {
                    txFormData.categoryType = money_enums_1.CatType[$event.target.value];
                };
                ImportComponent.prototype.catFrequencyChanged = function ($event, txFormData) {
                    txFormData.categoryFrequency = money_enums_1.CatFrequency[$event.target.value];
                };
                ImportComponent.prototype.comptaDateChanged = function ($event, txFormData) {
                    if ($event.target.checked) {
                        txFormData.comptaDate = true;
                    }
                    else {
                        txFormData.resetComptaDate();
                    }
                };
                ImportComponent.prototype.saveAllTx = function () {
                    for (var _i = 0, _a = this.txFormDataList; _i < _a.length; _i++) {
                        var txFormData = _a[_i];
                        if (txFormData.categoryLink.categoryId) {
                            var comptaDate = void 0;
                            if (txFormData.comptaDate) {
                                comptaDate = new Date(txFormData.comptaYear, txFormData.comptaMonth, 1);
                            }
                            else {
                                comptaDate = txFormData.tx.date;
                            }
                            txFormData.categoryLink.categoryYear = comptaDate.getFullYear();
                            (function (comp, inComptaDate, txFormData) {
                                comp._categoryRestService.existsCategoryForYear(txFormData.categoryLink.categoryId, inComptaDate.getFullYear()).subscribe(function (category) {
                                    if (category) {
                                        if (category.frequency == money_enums_1.CatFrequency.MONTHLY) {
                                            txFormData.categoryLink.periodIndex = inComptaDate.getMonth();
                                        }
                                        else if (category.frequency == money_enums_1.CatFrequency.QUARTER) {
                                            txFormData.categoryLink.periodIndex = Math.floor((inComptaDate.getMonth() + 3) / 3) - 1;
                                        }
                                        else if (category.frequency == money_enums_1.CatFrequency.YEARLY) {
                                            txFormData.categoryLink.periodIndex = 0;
                                        }
                                        comp._txrefRestService.create(new txref_class_1.Txref(txFormData.tx.ref)).subscribe(function (txrefAdded) {
                                            console.log("Added tx ref");
                                        });
                                        comp._categoryRestService.addTx(txFormData).subscribe(function (txAdded) {
                                            console.log("Added tx");
                                        });
                                    }
                                });
                            })(this, comptaDate, txFormData);
                        }
                    }
                };
                ImportComponent = __decorate([
                    core_1.Component({
                        selector: 'money-import',
                        templateUrl: 'html/import/index.html',
                        directives: [],
                        pipes: [money_pipes_1.CatfilterPipe]
                    }), 
                    __metadata('design:paramtypes', [preference_rest_service_1.PreferenceRestService, account_setting_rest_service_1.AccountSettingRestService, csv_reader_rest_service_1.CsvReaderRestService, txref_rest_service_1.TxrefRestService, category_rest_service_1.CategoryRestService, form_utils_service_1.FormUtilsService])
                ], ImportComponent);
                return ImportComponent;
            })();
            exports_1("ImportComponent", ImportComponent);
        }
    }
});
