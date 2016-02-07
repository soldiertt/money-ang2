System.register(['angular2/core', 'angular2/common', '../../model/formutil/multipart-uploader.class', '../../model/formutil/multipart-item.class', '../../model/core/account-setting.class', '../../model/core/field-mapping.class', '../../model/validation/account-form-validator.class', 'angular2/http', '../directive/display-error.directive'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, multipart_uploader_class_1, multipart_item_class_1, account_setting_class_1, field_mapping_class_1, account_form_validator_class_1, http_1, display_error_directive_1;
    var AdminCsvComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            }],
        execute: function() {
            AdminCsvComponent = (function () {
                function AdminCsvComponent(_http, fb) {
                    this._http = _http;
                    this.uploadUrl = '/upload';
                    this.accountSetting = new account_setting_class_1.AccountSetting();
                    var accountFormValidator = new account_form_validator_class_1.AccountFormValidator(this);
                    this.fieldMappingControl = fb.control('', accountFormValidator.validate);
                    this.accountForm = fb.group({
                        name: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(30)])),
                        accountNumber: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(16), common_1.Validators.maxLength(16)])),
                        csvfile: fb.control(''),
                        headerLinesCount: fb.control('', accountFormValidator.isValidNumber),
                        fieldSeparator: fb.control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(1), common_1.Validators.maxLength(1)])),
                        fieldMapping: this.fieldMappingControl
                    });
                }
                AdminCsvComponent.prototype.onSettingChange = function (value) {
                    if (value) {
                        this.updateTokens(this);
                    }
                };
                /**
                  Called after new csv upload.
                  Called in headerLinesCount setter and fieldSeparatorSetter.
                **/
                AdminCsvComponent.prototype.updateTokens = function (thisComp) {
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
                AdminCsvComponent.prototype.onMappingChange = function ($event) {
                    this.fieldMappingControl.updateValue($event); //Just to fire change detection
                    this.fieldMappingControl.markAsDirty();
                };
                AdminCsvComponent.prototype.onUpload = function (fileinput) {
                    this.file = fileinput.target.files[0];
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
                    var uploader = new multipart_uploader_class_1.MultipartUploader({ url: this.uploadUrl });
                    var item = new multipart_item_class_1.MultipartItem(uploader);
                    item.formData = new FormData();
                    item.formData.append("csvfile", this.file);
                    var adminCsvComp = this;
                    var uploadCallback = function (response) {
                        var allLines = JSON.parse(response);
                        adminCsvComp.fileFirstLines = allLines.slice(0, 10);
                        adminCsvComp.updateTokens(adminCsvComp);
                    };
                    item.callback = uploadCallback;
                    item.upload();
                };
                AdminCsvComponent.prototype.createAccount = function () {
                    console.log(this.accountSetting);
                };
                AdminCsvComponent = __decorate([
                    core_1.Component({
                        selector: 'admin-csv',
                        templateUrl: 'app/view/admin/admin-csv.html',
                        directives: [display_error_directive_1.DisplayErrorDirective]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, common_1.FormBuilder])
                ], AdminCsvComponent);
                return AdminCsvComponent;
            })();
            exports_1("AdminCsvComponent", AdminCsvComponent);
        }
    }
});
