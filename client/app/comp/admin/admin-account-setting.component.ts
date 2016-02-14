import {Component} from 'angular2/core'
import {Control, ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {Http, RequestOptions, RequestMethod, Headers} from 'angular2/http'

import {MultipartUploader} from '../../model/formutil/multipart-uploader.class'
import {MultipartItem} from '../../model/formutil/multipart-item.class'
import {AccountSetting} from '../../model/core/account-setting.class'
import {FieldMapping} from '../../model/core/field-mapping.class'
import {AccountFormValidator} from '../../model/validation/account-form-validator.class'
import {AccountSettingRestService} from '../../service/account-setting-rest.service'
import {FormUtilsService} from '../../service/form-utils.service'
import {DisplayErrorDirective} from '../directive/display-error.directive'

@Component({
    selector: 'money-admin-account-setting',
    templateUrl: 'app/view/admin/account-setting.html',
    directives: [DisplayErrorDirective]
})
export class AdminAccountSettingComponent {
  accountForm: ControlGroup;
  fileFirstLines: Array<string>;
  lineTokens: Array<string>;
  dummyFieldMappingControl: Control;
  accountSetting: AccountSetting = new AccountSetting();
  allAccountSettings: Array<AccountSetting>;

  constructor(private _http: Http, fb: FormBuilder, private _accountSettingRestService: AccountSettingRestService, private _formUtilsService: FormUtilsService) {
    let accountFormValidator = new AccountFormValidator(this);
    this.dummyFieldMappingControl = fb.control('', accountFormValidator.validate);
    this.dummyFieldMappingControl.markAsDirty();
    this.accountForm = fb.group({
      name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      accountNumber: fb.control('', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])),
      csvfile: fb.control(''),
      fileStartsWith: fb.control('', Validators.compose([Validators.required])),
      headerLinesCount: fb.control('', accountFormValidator.isValidNumber),
      fieldSeparator: fb.control('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])),
      fieldMapping: this.dummyFieldMappingControl
    });
    this._accountSettingRestService.list().subscribe(accountSettings => {
      this.allAccountSettings = accountSettings;
    });
  }

  onSettingChange(value: any) {
    if (value) {
      this.updateTokens(this);
    }
  }

  /**
    * Called after new sample csv is uploaded
    * Called if headerLinesCount change or fieldSeparatorSetter change.
  **/
  updateTokens(thisComp: AdminAccountSettingComponent) {
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
    this.dummyFieldMappingControl.updateValue($event); //Just to fire change detection
  }

  onCsvSampleUpload(fileinput: any) {
    const UPLOAD_URL = "/upload";
    let sampleCsvFile : File = fileinput.target.files[0];
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
    let uploader:MultipartUploader = new MultipartUploader({url: UPLOAD_URL});
    let item:MultipartItem = new MultipartItem(uploader);
    item.formData = new FormData();
    item.formData.append("csvfile",  sampleCsvFile);

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
    this._accountSettingRestService.create(this.accountSetting).subscribe(response => {
      this.allAccountSettings.push(response.json());
      this.accountSetting = new AccountSetting();
      this.fileFirstLines = undefined;
      this.lineTokens = undefined;
      this._formUtilsService.reset(this.accountForm, 'csvfile');
    })
  }

  onDelete(accountSetting: AccountSetting) {
    let settingIndex = this.allAccountSettings.indexOf(accountSetting);
    if (settingIndex > -1) {
      this._accountSettingRestService.delete(accountSetting.id).subscribe(response => {
        this.allAccountSettings.splice(settingIndex, 1);
      })
    } else {
      console.error("Cannot find AccountSettingRestService to delete with id ", accountSetting.id);
    }
  }
}
