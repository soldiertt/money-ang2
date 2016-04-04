import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'

import {MultipartUploader}          from '../model/formutil/multipart-uploader.class'
import {MultipartItem}              from '../model/formutil/multipart-item.class'

@Injectable()
export class UploadCsvService {
    constructor(private _http: Http) {
    }

    uploadFile(uploadUrl: string, file: File, successCallback: Function, failureCallback: Function) {
      let uploader:MultipartUploader = new MultipartUploader({url: uploadUrl});
      let item:MultipartItem = new MultipartItem(uploader);
      item.formData = new FormData();
      item.formData.append("csvfile",  file);

      let uploadCallback = function(response: any) {
        if (!item.isError) {
          successCallback(response);
        } else {
          failureCallback(response);
        }
      };

      item.callback = uploadCallback;
      item.upload();
    }

}
