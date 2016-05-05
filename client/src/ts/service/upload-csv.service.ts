import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {MultipartUploader}          from "../model/formutil/multipart-uploader.class";
import {MultipartItem}              from "../model/formutil/multipart-item.class";

@Injectable()
export class UploadCsvService {
    constructor(private _http: Http) {
    }

    uploadFile(uploadUrl: string, file: File, successCallback: Function, failureCallback: Function) {
      let uploader: MultipartUploader = new MultipartUploader({url: uploadUrl});
      let item: MultipartItem = new MultipartItem(uploader);
      item.formData = new FormData();
      item.formData.append("csvfile",  file);

      let uploadCallback = function(response: any) {
        let resp = JSON.parse(response);
        if (!item.isError) {
          successCallback(resp);
        } else {
          failureCallback(resp);
        }
      };

      item.callback = uploadCallback;
      item.upload();
    }

}
