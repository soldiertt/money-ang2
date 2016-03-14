System.register(['angular2/core', 'angular2/common', 'angular2/http', '../../model/formutil/multipart-uploader.class', '../../model/formutil/multipart-item.class', '../../model/core/account-setting.class', '../../model/core/field-mapping.class', '../../model/validation/account-form-validator.class', '../../service/account-setting-rest.service', '../../service/form-utils.service', '../directive/display-error.directive'], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, multipart_uploader_class_1, multipart_item_class_1, account_setting_class_1, field_mapping_class_1, account_form_validator_class_1, account_setting_rest_service_1, form_utils_service_1, display_error_directive_1;
    var AdminAccountSettingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (multipart_uploader_class_1_1) {
                multipart_uploader_class_1 = multipart_uploader_class_1_1;
            },
            function (multipart_item_class_1_1) {
                multipart_item_class_1 = multipart_item_class_1_1;
            },
            function (account_setting_class_1_1) {
                account_setting_class_1 = account_setting_class_1_1;
            },
            function (field_mapping_class_1_1) {
                field_mapping_class_1 = field_mapping_class_1_1;
            },
            function (account_form_validator_class_1_1) {
                account_form_validator_class_1 = account_form_validator_class_1_1;
            },
            function (account_setting_rest_service_1_1) {
                account_setting_rest_service_1 = account_setting_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            }],
        execute: function() {
            AdminAccountSettingComponent = (function () {
                function AdminAccountSettingComponent(_http, fb, _accountSettingRestService, _formUtilsService) {
                    var _this = this;
                    this._http = _http;
                    this._accountSettingRestService = _accountSettingRestService;
                    this._formUtilsService = _formUtilsService;
                    this.accountSetting = new account_setting_class_1.AccountSetting();
                    var accountFormValidator = new account_form_validator_class_1.AccountFormValidator(this);
                    this.dummyFieldMappingControl = fb.control('', accountFormValidator.validate);
                    this.dummyFieldMappingControl.markAsDirty();
                    this.accountForm = fb.group({
                        name: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(30)])),
                        accountNumber: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(16), common_1.Validators.maxLength(16)])),
                        csvfile: fb.control(''),
                        fileStartsWith: fb.control('', common_1.Validators.compose([common_1.Validators.required])),
                        headerLinesCount: fb.control('', accountFormValidator.isValidNumber),
                        fieldSeparator: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(1), common_1.Validators.maxLength(1)])),
                        fieldMapping: this.dummyFieldMappingControl
                    });
                    this._accountSettingRestService.list().subscribe(function (accountSettings) {
                        _this.allAccountSettings = accountSettings;
                    });
                }
                AdminAccountSettingComponent.prototype.onSettingChange = function (value) {
                    if (value) {
                        this.updateTokens(this);
                    }
                };
                /**
                  * Called after new sample csv is uploaded
                  * Called if headerLinesCount change or fieldSeparatorSetter change.
                **/
                AdminAccountSettingComponent.prototype.updateTokens = function (thisComp) {
                    if (thisComp.accountSetting.headerLinesCount < thisComp.fileFirstLines.length) {
                        thisComp.lineTokens = thisComp.fileFirstLines[thisComp.accountSetting.headerLinesCount].split(thisComp.accountSetting.fieldSeparator);
                        thisComp.accountSetting.fieldMappings = [];
                        var index = 0;
                        for (var _i = 0, _a = thisComp.lineTokens; _i < _a.length; _i++) {
                            var token = _a[_i];
                            thisComp.accountSetting.fieldMappings.push(new field_mapping_class_1.FieldMapping('ignore', index++));
                        }
                    }
                };
                /**
                  Called after a mapping select box changed, to force validation computing.
                **/
                AdminAccountSettingComponent.prototype.onMappingChange = function ($event) {
                    this.dummyFieldMappingControl.updateValue($event); //Just to fire change detection
                };
                AdminAccountSettingComponent.prototype.onCsvSampleUpload = function (fileinput) {
                    var UPLOAD_URL = "/upload";
                    var sampleCsvFile = fileinput.target.files[0];
                    /** NOT YET ANGULAR2 WAY TO DO THIS, SO USE THIRD PARTY LIB USING XMLHttpRequest
                    see https://github.com/wangzilong/angular2-multipartForm **/
                    /*let formData:FormData = new FormData("name", this.file);
                    let opts: RequestOptions = new RequestOptions();
                    let headers = new Headers();
                    headers.set('Content-Type', 'multipart/form-data');
                    opts.method = RequestMethod.Post;
                    opts.headers = headers;
                    this._http.post(this.url, JSON.stringify(formData), { headers: headers })
                    .subscribe(response => {
                      console.log(response.json());
                    })*/
                    var uploader = new multipart_uploader_class_1.MultipartUploader({ url: UPLOAD_URL });
                    var item = new multipart_item_class_1.MultipartItem(uploader);
                    item.formData = new FormData();
                    item.formData.append("csvfile", sampleCsvFile);
                    var adminCsvComp = this;
                    var uploadCallback = function (response) {
                        var allLines = JSON.parse(response);
                        adminCsvComp.fileFirstLines = allLines.slice(0, 15);
                        adminCsvComp.updateTokens(adminCsvComp);
                    };
                    item.callback = uploadCallback;
                    item.upload();
                };
                AdminAccountSettingComponent.prototype.createAccount = function () {
                    var _this = this;
                    this._accountSettingRestService.create(this.accountSetting).subscribe(function (response) {
                        _this.allAccountSettings.push(response.json());
                        _this.accountSetting = new account_setting_class_1.AccountSetting();
                        _this.fileFirstLines = undefined;
                        _this.lineTokens = undefined;
                        _this._formUtilsService.reset(_this.accountForm, 'csvfile');
                    });
                };
                AdminAccountSettingComponent.prototype.onDelete = function (accountSetting) {
                    var _this = this;
                    var settingIndex = this.allAccountSettings.indexOf(accountSetting);
                    if (settingIndex > -1) {
                        this._accountSettingRestService.delete(accountSetting.id).subscribe(function (response) {
                            _this.allAccountSettings.splice(settingIndex, 1);
                        });
                    }
                    else {
                        console.error("Cannot find AccountSettingRestService to delete with id ", accountSetting.id);
                    }
                };
                AdminAccountSettingComponent = __decorate([
                    core_1.Component({
                        selector: 'money-admin-account-setting',
                        templateUrl: 'html/admin/account-setting.html',
                        styleUrls: ['css/admin/account-setting.css'],
                        directives: [display_error_directive_1.DisplayErrorDirective]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, common_1.FormBuilder, account_setting_rest_service_1.AccountSettingRestService, form_utils_service_1.FormUtilsService])
                ], AdminAccountSettingComponent);
                return AdminAccountSettingComponent;
            }());
            exports_1("AdminAccountSettingComponent", AdminAccountSettingComponent);
        }
    }
});
