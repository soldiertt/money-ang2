System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/observable/forkJoin', '../../model/core/money-enums', '../../model/core/txref.class', '../../model/utils/tx-mapper.class', '../../service/preference-rest.service', '../../service/account-setting-rest.service', '../../service/category-rest.service', '../../service/csv-reader-rest.service', '../../service/txref-rest.service', '../../service/rule.service', '../../service/form-utils.service', '../../pipe/money-pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, money_enums_1, txref_class_1, tx_mapper_class_1, preference_rest_service_1, account_setting_rest_service_1, category_rest_service_1, csv_reader_rest_service_1, txref_rest_service_1, rule_service_1, form_utils_service_1, money_pipes_1;
    var ImportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
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
            function (rule_service_1_1) {
                rule_service_1 = rule_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            ImportComponent = (function () {
                function ImportComponent(_prefRestService, _accountSettingRestService, _csvReaderRestService, _txrefRestService, _categoryRestService, _formUtilsService, _ruleService) {
                    this._prefRestService = _prefRestService;
                    this._accountSettingRestService = _accountSettingRestService;
                    this._csvReaderRestService = _csvReaderRestService;
                    this._txrefRestService = _txrefRestService;
                    this._categoryRestService = _categoryRestService;
                    this._formUtilsService = _formUtilsService;
                    this._ruleService = _ruleService;
                    this.txFormDataList = [];
                    this.pendingTxList = [];
                    this.months = this._formUtilsService.getAppMonths();
                    this.years = this._formUtilsService.getAppYears();
                }
                ImportComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._categoryRestService.list().subscribe(function (categories) {
                        _this.allCategories = categories;
                    });
                    this._prefRestService.getPref().subscribe(function (preference) {
                        _this._accountSettingRestService.list().subscribe(function (accounts) {
                            var readLinesJobs = [];
                            accounts.forEach(function (account) {
                                readLinesJobs.push(_this._csvReaderRestService.list(preference.csvPath, account));
                            });
                            Observable_1.Observable.forkJoin(readLinesJobs).subscribe(function (linesByAccountArray) {
                                linesByAccountArray.forEach(function (linesByAccount) {
                                    _this.pendingTxList = _this.pendingTxList.concat(linesByAccount.csvLines.map(function (csvLine) { return tx_mapper_class_1.TxMapper.mapLineToTx(csvLine, linesByAccount.account); }));
                                });
                                _this.reducePendingTxList();
                            });
                        });
                    });
                };
                ImportComponent.prototype.reducePendingTxList = function () {
                    var _this = this;
                    // 1. Remove duplicates Tx with identical refs (e.a. same tx exported twice)
                    this.pendingTxList = this.pendingTxList.reduce(function (reduced, tx) {
                        if (!reduced.some(function (tx2) { return tx2.ref === tx.ref; })) {
                            reduced.push(tx);
                        }
                        return reduced;
                    }, []);
                    // 2. sort list by date
                    this.pendingTxList.sort(function (a, b) {
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
                    // 3. Check if Tx already in DB
                    this._txrefRestService.readByRefs(this.pendingTxList).subscribe(function (foundRefs) {
                        _this.pendingTxList = _this.pendingTxList.filter(function (tx) { return foundRefs.indexOf(tx.ref) == -1; });
                        _this.populateTxToDisplay();
                    });
                };
                ImportComponent.prototype.populateTxToDisplay = function () {
                    var _this = this;
                    this.pendingTxList = this.pendingTxList.filter(function (tx) {
                        if (_this.txFormDataList.length < 10) {
                            var txFormData = _this._ruleService.applyRules(tx, true);
                            _this.txFormDataList.push(txFormData);
                            return false;
                        }
                        else {
                            return true;
                        }
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
                ImportComponent.prototype.getTxYear = function (txFormData) {
                    if (txFormData.comptaDate) {
                        return txFormData.comptaYear;
                    }
                    else {
                        return txFormData.tx.date.getFullYear();
                    }
                };
                ImportComponent.prototype.saveAllTx = function () {
                    var _this = this;
                    var toSaveList = this.txFormDataList.filter(function (txFormData) { if (txFormData.categoryLink.categoryId) {
                        return true;
                    }
                    else {
                        return false;
                    } ; });
                    toSaveList.forEach(function (txFormData) {
                        var comptaDate;
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
                                else {
                                    console.error("Error adding tx with ref ", txFormData.tx.ref, "category", txFormData.categoryLink.categoryId, "not available for year", inComptaDate.getFullYear());
                                }
                            });
                        })(_this, comptaDate, txFormData);
                    });
                    this.txFormDataList = this.txFormDataList.filter(function (txFormData) { if (txFormData.categoryLink.categoryId) {
                        return false;
                    }
                    else {
                        return true;
                    } ; });
                    this.populateTxToDisplay();
                };
                ImportComponent = __decorate([
                    core_1.Component({
                        selector: 'money-import',
                        templateUrl: 'html/import/index.html',
                        styleUrls: ['css/import.css'],
                        pipes: [money_pipes_1.CatfilterPipe, money_pipes_1.CategorySorterPipe]
                    }), 
                    __metadata('design:paramtypes', [preference_rest_service_1.PreferenceRestService, account_setting_rest_service_1.AccountSettingRestService, csv_reader_rest_service_1.CsvReaderRestService, txref_rest_service_1.TxrefRestService, category_rest_service_1.CategoryRestService, form_utils_service_1.FormUtilsService, rule_service_1.RuleService])
                ], ImportComponent);
                return ImportComponent;
            }());
            exports_1("ImportComponent", ImportComponent);
        }
    }
});
