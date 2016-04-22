System.register(["angular2/core", "angular2/common", "../../model/core/category.class", "../../model/core/money-enums", "../../model/utils/category-years-checker", "../../service/category-rest.service", "../../service/form-utils.service", "../directive/display-error.directive", "../directive/focus-on-init.directive", "../../pipe/money-pipes", "./admin-menu.component"], function(exports_1, context_1) {
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
    var core_1, common_1, category_class_1, money_enums_1, category_years_checker_1, category_rest_service_1, form_utils_service_1, display_error_directive_1, focus_on_init_directive_1, money_pipes_1, admin_menu_component_1;
    var AdminCategoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (category_class_1_1) {
                category_class_1 = category_class_1_1;
            },
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            },
            function (category_years_checker_1_1) {
                category_years_checker_1 = category_years_checker_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            },
            function (focus_on_init_directive_1_1) {
                focus_on_init_directive_1 = focus_on_init_directive_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            },
            function (admin_menu_component_1_1) {
                admin_menu_component_1 = admin_menu_component_1_1;
            }],
        execute: function() {
            AdminCategoryComponent = (function () {
                function AdminCategoryComponent(_categoryRestService, _formUtilsService, _categoryYearsChecker, fb) {
                    var _this = this;
                    this._categoryRestService = _categoryRestService;
                    this._formUtilsService = _formUtilsService;
                    this._categoryYearsChecker = _categoryYearsChecker;
                    this.txExistsForRemovedYears = false;
                    this.yearList = _formUtilsService.getAppYears();
                    this._categoryRestService.list().subscribe(function (categories) {
                        _this.categories = categories;
                    });
                    this.createForm = fb.group({
                        name: fb.control("", common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(50)])),
                        type: fb.control("", common_1.Validators.required),
                        frequency: fb.control("", common_1.Validators.required),
                        years: fb.control([], common_1.Validators.required)
                    });
                    this.editForm = fb.group({
                        years: fb.control([], common_1.Validators.compose([common_1.Validators.required]))
                    });
                }
                AdminCategoryComponent.prototype.yearsValueChange = function (event) {
                    // Multi-value field not yet manage, so do manually
                    var allSelectedYears = [];
                    for (var i in event.target.selectedOptions) {
                        if (event.target.selectedOptions[i].value) {
                            allSelectedYears.push(Number(event.target.selectedOptions[i].value));
                        }
                    }
                    this.createForm.controls["years"].updateValue(allSelectedYears);
                };
                AdminCategoryComponent.prototype.yearsEditValueChange = function (event) {
                    // Multi-value field not yet manage, so do manually
                    var allSelectedYears = [];
                    for (var i in event.target.selectedOptions) {
                        if (event.target.selectedOptions[i].value) {
                            allSelectedYears.push(Number(event.target.selectedOptions[i].value));
                        }
                    }
                    this.editForm.controls["years"].updateValue(allSelectedYears);
                };
                AdminCategoryComponent.prototype.onCreate = function () {
                    var _this = this;
                    var controls = this.createForm.controls;
                    var newCateg = new category_class_1.Category(controls["name"].value, money_enums_1.CatType[controls["type"].value], money_enums_1.CatFrequency[controls["frequency"].value], controls["years"].value);
                    this._categoryRestService.create(newCateg).subscribe(function (response) {
                        _this.categories.push(response.json());
                        _this._formUtilsService.reset(_this.createForm, "name", "type", "frequency", "years");
                    }, function (err) { return console.log(err); });
                };
                /** TEMP ***************************************/
                AdminCategoryComponent.prototype.bulkCreate = function ($event) {
                    $event.preventDefault();
                    var categs = [];
                    categs.push(new category_class_1.Category("Assurance voiture", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Crèche Liam", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Crédit Hypoth. Argenta", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Electricité", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Li Yun : Beobank", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Li Yun : Proximus", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Maylee : repas/garderies", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Syndicat Smals", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("TV / Internet / Tel.", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Charges Verdurmen-Remy", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.QUARTER, [2016]));
                    categs.push(new category_class_1.Category("Li Yun : syndicat CSC", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.QUARTER, [2016]));
                    categs.push(new category_class_1.Category("Mutuelle FMSB", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.QUARTER, [2016]));
                    categs.push(new category_class_1.Category("Ass. home Argenta", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Ass. vie Argenta", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Précompte immobilier", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Contributions voiture", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Décompte des charges", money_enums_1.CatType.FIXED, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Autres entrants", money_enums_1.CatType.INCOMING, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Salaire SMALS", money_enums_1.CatType.INCOMING, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Remb. FMSB", money_enums_1.CatType.INCOMING, money_enums_1.CatFrequency.QUARTER, [2016]));
                    categs.push(new category_class_1.Category("Contributions", money_enums_1.CatType.INCOMING, money_enums_1.CatFrequency.YEARLY, [2016]));
                    categs.push(new category_class_1.Category("Argent de poche", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Carburant", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Divers", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Frais enfants", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Informatique / Loisirs", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Li Yun", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Nourriture", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Pharmacie / Médecins", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Resto / Sorties", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Vêtements / acc.", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.MONTHLY, [2016]));
                    categs.push(new category_class_1.Category("Frais voitures", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.QUARTER, [2016]));
                    categs.push(new category_class_1.Category("Mobilier / Accessoires", money_enums_1.CatType.OTHER, money_enums_1.CatFrequency.QUARTER, [2016]));
                    for (var _i = 0, categs_1 = categs; _i < categs_1.length; _i++) {
                        var newCateg = categs_1[_i];
                        this._categoryRestService.create(newCateg).subscribe(function (response) {
                            // Success
                        }, function (err) { return console.log(err); });
                    }
                };
                /** TEMP ***************************************/
                AdminCategoryComponent.prototype.onEdit = function (category) {
                    this.editedCat = category;
                    this.editForm.controls["years"].updateValue(category.years);
                };
                AdminCategoryComponent.prototype.onCancelEdit = function ($event) {
                    $event.preventDefault();
                    this.editedCat = undefined;
                    this.txExistsForRemovedYears = false;
                };
                AdminCategoryComponent.prototype.onUpdate = function () {
                    var _this = this;
                    var controls = this.editForm.controls;
                    var removedYears = this._categoryYearsChecker.removedYears(this.editedCat.years, controls["years"].value);
                    var addedYears = this._categoryYearsChecker.addedYears(this.editedCat.years, controls["years"].value);
                    if (removedYears.length > 0) {
                        this._categoryRestService.existsTxForYears(this.editedCat.id, removedYears).subscribe(function (exists) {
                            if (exists) {
                                _this.txExistsForRemovedYears = true;
                            }
                            else {
                                _this.updateOk(controls, removedYears, addedYears);
                            }
                        }, function (err) { return console.log(err); });
                    }
                    else {
                        if (addedYears.length > 0) {
                            this.updateOk(controls, removedYears, addedYears);
                        }
                        else {
                            // Nothing change
                            this.editedCat = undefined;
                        }
                    }
                };
                AdminCategoryComponent.prototype.updateOk = function (controls, removedYears, addedYears) {
                    var _this = this;
                    this.txExistsForRemovedYears = false;
                    this.editedCat = this._categoryYearsChecker.addMissingPeriods(this.editedCat, addedYears);
                    this.editedCat = this._categoryYearsChecker.removedOldPeriods(this.editedCat, removedYears);
                    this.editedCat.years = controls["years"].value;
                    this._categoryRestService.update(this.editedCat).subscribe(function (response) {
                        _this.editedCat = undefined;
                    }, function (err) { return console.log(err); });
                };
                AdminCategoryComponent.prototype.onDelete = function (category) {
                    var _this = this;
                    var categIndex = this.categories.indexOf(category);
                    if (categIndex > -1) {
                        this._categoryRestService.existsTxForYears(category.id, category.years).subscribe(function (exists) {
                            if (exists) {
                                console.error("Cannot delete category containing transactions !");
                            }
                            else {
                                _this._categoryRestService.delete(category.id).subscribe(function (response) {
                                    _this.categories.splice(categIndex, 1);
                                });
                            }
                        }, function (err) { return console.log(err); });
                    }
                    else {
                        console.error("Cannot find category to delete with id ", category.id);
                    }
                };
                AdminCategoryComponent = __decorate([
                    core_1.Component({
                        selector: "money-admin-category",
                        templateUrl: "html/admin/category.html",
                        directives: [display_error_directive_1.DisplayErrorDirective, focus_on_init_directive_1.FocusOnInitDirective, admin_menu_component_1.AdminMenuComponent],
                        pipes: [money_pipes_1.CategorySorterPipe]
                    }), 
                    __metadata('design:paramtypes', [category_rest_service_1.CategoryRestService, form_utils_service_1.FormUtilsService, category_years_checker_1.CategoryYearsChecker, common_1.FormBuilder])
                ], AdminCategoryComponent);
                return AdminCategoryComponent;
            }());
            exports_1("AdminCategoryComponent", AdminCategoryComponent);
        }
    }
});
//# sourceMappingURL=admin-category.component.js.map