import {Injectable} from 'angular2/core'
import {Control, ControlGroup} from 'angular2/common'

@Injectable()
export class FormUtilsService {

    reset(form: ControlGroup, ...controlNames: Array<string>): void {
      for (let controlName of controlNames) {
        (<Control> form.controls[controlName]).updateValue('');
      }
    }

}
