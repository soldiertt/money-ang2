import {Component} from 'angular2/core'
import {Control, ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {MultipartUploader} from '../../model/formutil/multipart-uploader.class'
import {MultipartItem} from '../../model/formutil/multipart-item.class'
import {AccountSetting} from '../../model/core/account-setting.class'
import {FieldMapping} from '../../model/core/field-mapping.class'
import {AccountFormValidator} from '../../model/validation/account-form-validator.class'
import {Http, RequestOptions, RequestMethod, Headers} from 'angular2/http'
import {DisplayErrorDirective} from '../directive/display-error.directive'

@Component({
    selector: 'admin-csv',
    templateUrl: 'app/view/admin/admin-csv.html',
    directives: [DisplayErrorDirective]
})
export class AdminCsvComponent {
  accountForm: ControlGroup;
  uploadUrl: string = '/upload';
  file: File;
  fileFirstLines: Array<string>;
  lineTokens: Array<string>;
  fieldMappingControl: Control;
  accountSetting: AccountSetting = new AccountSetting();

  constructor(private _http: Http, fb: FormBuilder) {
    let accountFormValidator = new AccountFormValidator(this);
    this.fieldMappingControl = fb.control('', accountFormValidator.validate);
    this.accountForm = fb.group({
      name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      accountNumber: fb.control('', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])),
      csvfile: fb.control(''),
      headerLinesCount: fb.control('', accountFormValidator.isValidNumber),
      fieldSeparator: fb.control('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])),
      fieldMapping: this.fieldMappingControl
    });
  }

  onSettingChange(value: any) {
    if (value) {
      this.updateTokens(this);
    }
  }

  /**
    Called after new csv upload.
    Called in headerLinesCount setter and fieldSeparatorSetter.
  **/
  updateTokens(thisComp: AdminCsvComponent) {
    if (thisComp.accountSetting.headerLinesCount < thisComp.fileFirstLines.length) {
      thisComp.lineTokens = thisComp.fileFirstLines[thisComp.accountSetting.headerLinesCount].split(thisComp.accountSetting.fieldSeparator);
      thisComp.accountSetting.fieldMappings = [];
      let index = 0;
      for (let token of thisComp.lineTokens) {
        thisComp.accountSetting.fieldMappings.push(new FieldMapping('ignore', index++));
      }
    }
  }

  /**
    Called after a mapping select box changed, to force validation computing.
  **/
  onMappingChange($event) {
    this.fieldMappingControl.updateValue($event); //Just to fire change detection
    this.fieldMappingControl.markAsDirty();
  }

  onUpload(fileinput: any) {
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
    let uploader:MultipartUploader = new MultipartUploader({url: this.uploadUrl});
    let item:MultipartItem = new MultipartItem(uploader);
    item.formData = new FormData();
    item.formData.append("csvfile",  this.file);

    let adminCsvComp = this;
    let uploadCallback = function(response: any) {
      let allLines:Array<string> = JSON.parse(response);
      adminCsvComp.fileFirstLines = allLines.slice(0, 10);
      adminCsvComp.updateTokens(adminCsvComp);
    };

    item.callback = uploadCallback;
    item.upload();
  }

  createAccount() {
    console.log(this.accountSetting);
  }
}
