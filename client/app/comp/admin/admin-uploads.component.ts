import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {UploadCsvService}           from "../../service/upload-csv.service"
import {DisplayErrorDirective}      from '../directive/display-error.directive'

@Component({
    selector: 'money-admin-uploads',
    templateUrl: 'html/admin/uploads.html',
    //styleUrls : ['css/admin/uploads.css'],
    directives: [DisplayErrorDirective]
})
export class AdminUploadsComponent {

  uploadForm: ControlGroup;
  uploads;

  constructor(fb: FormBuilder, private _uploadCsvService: UploadCsvService) {
    this.uploadForm = fb.group({
      csvfile: fb.control('')
    });
  }

  onCsvUpload(fileinput: any) {
    const UPLOAD_URL = "/uploadcsv";
    let csvFile : File = fileinput.target.files[0],
        adminUploadComp = this,
        successCallback = function(response: any) {
          (<Control> adminUploadComp.uploadForm.controls['csvfile']).setErrors(undefined);
        },
        failureCallback = function(response: any) {
          (<Control> adminUploadComp.uploadForm.controls['csvfile']).setErrors({'uploadfailed': true});
        }

    this._uploadCsvService.uploadFile(UPLOAD_URL, csvFile, successCallback, failureCallback);
  }

}
