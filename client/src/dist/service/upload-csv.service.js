System.register(["@angular/core", "../model/formutil/multipart-uploader.class", "../model/formutil/multipart-item.class"], function(exports_1, context_1) {
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
    var core_1, multipart_uploader_class_1, multipart_item_class_1;
    var UploadCsvService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (multipart_uploader_class_1_1) {
                multipart_uploader_class_1 = multipart_uploader_class_1_1;
            },
            function (multipart_item_class_1_1) {
                multipart_item_class_1 = multipart_item_class_1_1;
            }],
        execute: function() {
            UploadCsvService = (function () {
                function UploadCsvService() {
                }
                UploadCsvService.prototype.uploadFile = function (uploadUrl, file, successCallback, failureCallback) {
                    var uploader = new multipart_uploader_class_1.MultipartUploader({ url: uploadUrl });
                    var item = new multipart_item_class_1.MultipartItem(uploader);
                    item.formData = new FormData();
                    item.formData.append("csvfile", file);
                    var uploadCallback = function (response) {
                        var resp = JSON.parse(response);
                        if (!item.isError) {
                            successCallback(resp);
                        }
                        else {
                            failureCallback(resp);
                        }
                    };
                    item.callback = uploadCallback;
                    item.upload();
                };
                UploadCsvService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UploadCsvService);
                return UploadCsvService;
            }());
            exports_1("UploadCsvService", UploadCsvService);
        }
    }
});
//# sourceMappingURL=upload-csv.service.js.map