System.register(['angular2/core', 'angular2/common', "../../service/upload-csv.service", '../directive/display-error.directive'], function(exports_1, context_1) {
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
    var core_1, common_1, upload_csv_service_1, display_error_directive_1;
    var AdminUploadsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (upload_csv_service_1_1) {
                upload_csv_service_1 = upload_csv_service_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            }],
        execute: function() {
            AdminUploadsComponent = (function () {
                function AdminUploadsComponent(fb, _uploadCsvService) {
                    this._uploadCsvService = _uploadCsvService;
                    this.uploadForm = fb.group({
                        csvfile: fb.control('')
                    });
                }
                AdminUploadsComponent.prototype.onCsvUpload = function (fileinput) {
                    var UPLOAD_URL = "/uploadcsv";
                    var csvFile = fileinput.target.files[0], adminUploadComp = this, successCallback = function (response) {
                        adminUploadComp.uploadForm.controls['csvfile'].setErrors(undefined);
                    }, failureCallback = function (response) {
                        adminUploadComp.uploadForm.controls['csvfile'].setErrors({ 'uploadfailed': true });
                    };
                    this._uploadCsvService.uploadFile(UPLOAD_URL, csvFile, successCallback, failureCallback);
                };
                AdminUploadsComponent = __decorate([
                    core_1.Component({
                        selector: 'money-admin-uploads',
                        templateUrl: 'html/admin/uploads.html',
                        //styleUrls : ['css/admin/uploads.css'],
                        directives: [display_error_directive_1.DisplayErrorDirective]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, upload_csv_service_1.UploadCsvService])
                ], AdminUploadsComponent);
                return AdminUploadsComponent;
            }());
            exports_1("AdminUploadsComponent", AdminUploadsComponent);
        }
    }
});
