System.register(["@angular/core", "@angular/forms", "../../service/upload-csv.service", "../../service/csv-files-rest.service"], function(exports_1, context_1) {
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
    var core_1, forms_1, upload_csv_service_1, csv_files_rest_service_1;
    var AdminUploadsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (upload_csv_service_1_1) {
                upload_csv_service_1 = upload_csv_service_1_1;
            },
            function (csv_files_rest_service_1_1) {
                csv_files_rest_service_1 = csv_files_rest_service_1_1;
            }],
        execute: function() {
            AdminUploadsComponent = (function () {
                function AdminUploadsComponent(fb, _uploadCsvService, _csvFilesRestService) {
                    var _this = this;
                    this._uploadCsvService = _uploadCsvService;
                    this._csvFilesRestService = _csvFilesRestService;
                    this.uploadForm = fb.group({
                        csvfile: fb.control("")
                    });
                    this._csvFilesRestService.getCsvNames().subscribe(function (fileNames) {
                        _this.csvFilenames = fileNames;
                    });
                    this._csvFilesRestService.getDefaultCsvPath().subscribe(function (resp) {
                        _this.defaultCsvPath = resp.path;
                    });
                }
                AdminUploadsComponent.prototype.onCsvUpload = function (fileinput) {
                    var UPLOAD_URL = "/uploadcsv";
                    var csvFile = fileinput.target.files[0], adminUploadComp = this, successCallback = function (response) {
                        adminUploadComp.uploadForm.controls["csvfile"].setErrors(undefined);
                        adminUploadComp.csvFilenames.push(response.fileName);
                    }, failureCallback = function (response) {
                        adminUploadComp.uploadForm.controls["csvfile"].setErrors({ "uploadfailed": true });
                    };
                    this._uploadCsvService.uploadFile(UPLOAD_URL, csvFile, successCallback, failureCallback);
                };
                AdminUploadsComponent.prototype.onDelete = function (csvFilename) {
                    var _this = this;
                    this._csvFilesRestService.deleteFile(csvFilename).subscribe(function (result) {
                        _this.csvFilenames = _this.csvFilenames.filter(function (elem) { return elem !== csvFilename; });
                        console.log(csvFilename, "was deleted");
                    });
                };
                AdminUploadsComponent = __decorate([
                    core_1.Component({
                        selector: "money-admin-uploads",
                        templateUrl: "assets/html/admin/uploads.html",
                        styleUrls: ["assets/css/admin/uploads.css"]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, upload_csv_service_1.UploadCsvService, csv_files_rest_service_1.CsvFilesRestService])
                ], AdminUploadsComponent);
                return AdminUploadsComponent;
            }());
            exports_1("AdminUploadsComponent", AdminUploadsComponent);
        }
    }
});
//# sourceMappingURL=admin-uploads.component.js.map