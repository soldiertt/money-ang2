System.register(['angular2/core', 'angular2/common', '../../model/core/category.class', '../../service/category-rest.service', '../../service/form-utils.service', '../directive/display-error.directive', '../../model/core/money-enums', '../../pipe/money-pipes'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, category_class_1, category_rest_service_1, form_utils_service_1, display_error_directive_1, money_enums_1, money_pipes_1;
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
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            },
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            AdminCategoryComponent = (function () {
                function AdminCategoryComponent(_categoryRestService, _formUtilsService, fb) {
                    var _this = this;
                    this._categoryRestService = _categoryRestService;
                    this._formUtilsService = _formUtilsService;
                    this.yearList = [2014, 2015, 2016];
                    this._categoryRestService.list().subscribe(function (categories) {
                        _this.categories = categories;
                    });
                    this.createForm = fb.group({
                        name: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(50)])),
                        type: fb.control('', common_1.Validators.required),
                        frequency: fb.control('', common_1.Validators.required),
                        years: fb.control([], common_1.Validators.compose([common_1.Validators.required]))
                    });
                }
                AdminCategoryComponent.prototype.yearsValueChange = function (event) {
                    var allSelectedYears = [];
                    for (var i in event.target.selectedOptions) {
                        if (event.target.selectedOptions[i].value) {
                            allSelectedYears.push(Number(event.target.selectedOptions[i].value));
                        }
                    }
                    this.createForm.controls['years'].updateValue(allSelectedYears);
                };
                AdminCategoryComponent.prototype.onCreate = function () {
                    var _this = this;
                    var controls = this.createForm.controls;
                    var newCateg = new category_class_1.Category(controls['name'].value, money_enums_1.CatType[controls['type'].value], money_enums_1.CatFrequency[controls['frequency'].value], controls['years'].value);
                    this._categoryRestService.create(newCateg).subscribe(function (response) {
                        _this.categories.push(response.json());
                        _this._formUtilsService.reset(_this.createForm, "name", "type", "frequency", "years");
                    }, function (err) { return console.log(err); });
                };
                AdminCategoryComponent.prototype.onDelete = function (category) {
                    var _this = this;
                    var categIndex = this.categories.indexOf(category);
                    if (categIndex > -1) {
                        this._categoryRestService.delete(category.id).subscribe(function (response) {
                            _this.categories.splice(categIndex, 1);
                        });
                    }
                    else {
                        console.error("Cannot find category to delete with id ", category.id);
                    }
                };
                AdminCategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'money-admin-category',
                        templateUrl: 'view/admin/category.html',
                        directives: [display_error_directive_1.DisplayErrorDirective],
                        pipes: [money_pipes_1.CategorySorterPipe]
                    }), 
                    __metadata('design:paramtypes', [category_rest_service_1.CategoryRestService, form_utils_service_1.FormUtilsService, common_1.FormBuilder])
                ], AdminCategoryComponent);
                return AdminCategoryComponent;
            })();
            exports_1("AdminCategoryComponent", AdminCategoryComponent);
        }
    }
});
