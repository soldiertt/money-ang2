import {Component} from 'angular2/core';
import {AbstractControl, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';

import {Category} from '../../model/core/category.class';
import {CategoryRestService} from '../../service/category-rest.service'
import {FormUtilsService} from '../../service/form-utils.service'
import {DisplayErrorDirective} from '../directive/display-error.directive'

@Component({
    selector: 'money-admin-category',
    templateUrl: 'app/view/admin/category.html',
    directives: [DisplayErrorDirective]
})

export class AdminCategoryComponent {
    categories: Array<Category>;
    createForm: ControlGroup;
    name: Control;

    constructor(private _categoryRestService : CategoryRestService, private _formUtilsService: FormUtilsService, fb: FormBuilder) {
      this._categoryRestService.list().subscribe(data => {
        this.categories = data.json();
      });

      this.createForm = fb.group({
        name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
        type: fb.control('', Validators.required),
        frequency: fb.control('', Validators.required),
        year: fb.control('', Validators.compose([Validators.required, this.isYear]))
      });
    }

    isYear(control: Control) {
      let year = new Number(control.value);
      let actualYear = new Date().getFullYear();
      if (year > (actualYear - 5) && year < (actualYear + 1)) {
        return null;
      } else {
        return {wrongYear : true};
      }
    };

    onCreate(): void {
      let controls = this.createForm.controls;
      let newCateg: Category = new Category(controls['name'].value, controls['type'].value, controls['frequency'].value, controls['year'].value);
      this._categoryRestService.create(newCateg).subscribe(response => {
        this.categories.push(response.json());
        this._formUtilsService.reset(this.createForm, "name", "type", "frequency", "year");
      });
    }

    onDelete(category: Category) {
      let categIndex = this.categories.indexOf(category);
      if (categIndex > -1) {
        this._categoryRestService.delete(category.id).subscribe(response => {
          this.categories.splice(categIndex, 1);
        })
      } else {
        console.error("Cannot find category to delete with id ", category.id);
      }
    }
}
