import {Component} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";

import {UploadCsvService}           from "../../service/upload-csv.service";
import {CsvFilesRestService}       from "../../service/csv-files-rest.service";

@Component({
    selector: "money-admin-uploads",
    templateUrl: "assets/html/admin/uploads.html",
    styleUrls : ["assets/css/admin/uploads.css"]
})
export class AdminUploadsComponent {

  uploadForm: FormGroup;
  csvFilenames: Array<string>;
  defaultCsvPath: string;

  constructor(fb: FormBuilder, private _uploadCsvService: UploadCsvService, private _csvFilesRestService: CsvFilesRestService) {
    this.uploadForm = fb.group({
      csvfile: fb.control("")
    });
    this._csvFilesRestService.getCsvNames().subscribe(fileNames => {
      this.csvFilenames = fileNames;
    });
    this._csvFilesRestService.getDefaultCsvPath().subscribe(resp => {
      this.defaultCsvPath = resp.path;
    });
  }

  onCsvUpload(fileinput: any) {
    const UPLOAD_URL = "/uploadcsv";
    let csvFile: File = fileinput.target.files[0],
        adminUploadComp = this,
        successCallback = function(response: any) {
          adminUploadComp.uploadForm.controls["csvfile"].setErrors(undefined);
          adminUploadComp.csvFilenames.push(response.fileName);
        },
        failureCallback = function(response: any) {
          adminUploadComp.uploadForm.controls["csvfile"].setErrors({"uploadfailed": true});
        };

    this._uploadCsvService.uploadFile(UPLOAD_URL, csvFile, successCallback, failureCallback);
  }

  onDelete(csvFilename: string) {
    this._csvFilesRestService.deleteFile(csvFilename).subscribe(result => {
      this.csvFilenames = this.csvFilenames.filter(elem => elem !== csvFilename);
      console.log(csvFilename, "was deleted");
    });
  }
}
