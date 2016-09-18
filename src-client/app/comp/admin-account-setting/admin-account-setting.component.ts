import {Component}                  from "@angular/core";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AccountSetting}             from "../../model/core/account-setting.class";
import {FieldMapping}               from "../../model/core/field-mapping.class";
import {AccountFormValidator}       from "../../model/validation/account-form-validator.class";
import {AccountSettingRestService}  from "../../service/account-setting-rest.service";
import {UploadCsvService}           from "../../service/upload-csv.service";

@Component({
    selector: "money-admin-account-setting",
    templateUrl: "app/comp/admin-account-setting/admin-account-setting.html",
    styleUrls: ["app/comp/admin-account-setting/admin-account-setting.css"]
})
export class AdminAccountSettingComponent {
    accountForm: FormGroup;
    fileFirstLines: Array<string>;
    lineTokens: Array<string>;
    dummyFieldMappingControl: FormControl;
    accountSetting: AccountSetting = new AccountSetting();
    allAccountSettings: Array<AccountSetting>;

    constructor(fb: FormBuilder,
                private _accountSettingRestService: AccountSettingRestService,
                private _uploadCsvService: UploadCsvService) {

        let accountFormValidator = new AccountFormValidator(this);
        this.dummyFieldMappingControl = fb.control("", accountFormValidator.validate);
        this.dummyFieldMappingControl.markAsDirty();
        this.accountForm = fb.group({
            name: fb.control("", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
            accountNumber: fb.control("", Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])),
            csvfile: fb.control(""),
            fileStartsWith: fb.control("", Validators.compose([Validators.required])),
            headerLinesCount: fb.control("", accountFormValidator.isValidNumber),
            fieldSeparator: fb.control("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])),
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
                thisComp.accountSetting.fieldMappings.push(new FieldMapping("ignore", index++));
            }
        }
    }

    /**
     Called after a mapping select box changed, to force validation computing.
     **/
    onMappingChange($event) {
        this.dummyFieldMappingControl.setValue($event); // Just to fire change detection
    }

    onCsvSampleUpload(fileinput: any) {
        const sampleCsvFile: File = fileinput.target.files[0];

        if (sampleCsvFile) {
            const UPLOAD_URL = "/uploadsample";
            const adminCsvComp = this;
            const successCallback = function (response: any) {
                adminCsvComp.accountForm.controls["csvfile"].setErrors(undefined);
                let allLines: Array<string> = response;
                adminCsvComp.fileFirstLines = allLines.slice(0, 15);
                adminCsvComp.updateTokens(adminCsvComp);
            };
            const failureCallback = function (response: any) {
                adminCsvComp.accountForm.controls["csvfile"].setErrors({"uploadfailed": true});
            };

            this._uploadCsvService.uploadFile(UPLOAD_URL, sampleCsvFile, successCallback, failureCallback);

        }
        /** NOT YET ANGULAR2 WAY TO DO THIS, SO USE THIRD PARTY LIB USING XMLHttpRequest
         see https://github.com/wangzilong/angular2-multipartForm **/
        /*let formData:FormData = new FormData("name", this.file);
         let opts: RequestOptions = new RequestOptions();
         let headers = new Headers();
         headers.set("Content-Type", "multipart/form-data");
         opts.method = RequestMethod.Post;
         opts.headers = headers;
         this._http.post(this.url, JSON.stringify(formData), { headers: headers })
         .subscribe(response => {
         console.log(response.json());
         })*/
    }

    createAccount() {
        this.accountSetting.name = this.accountForm.controls["name"].value;
        this.accountSetting.accountNumber = this.accountForm.controls["accountNumber"].value;
        this.accountSetting.fileStartsWith = this.accountForm.controls["fileStartsWith"].value;
        this._accountSettingRestService.create(this.accountSetting).subscribe(response => {
            this.allAccountSettings.push(response.json());
            this.accountSetting = new AccountSetting();
            this.fileFirstLines = undefined;
            this.lineTokens = undefined;
            this.accountForm.reset();
        });
    }

    onDelete(accountSetting: AccountSetting) {
        let settingIndex = this.allAccountSettings.indexOf(accountSetting);
        if (settingIndex > -1) {
            this._accountSettingRestService.delete(accountSetting.id).subscribe(response => {
                this.allAccountSettings.splice(settingIndex, 1);
            });
        } else {
            console.error("Cannot find AccountSettingRestService to delete with id ", accountSetting.id);
        }
    }
}
