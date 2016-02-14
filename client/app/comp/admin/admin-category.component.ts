import {Component} from 'angular2/core';
import {AbstractControl, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';

import {Category} from '../../model/core/category.class';
import {CategoryRestService} from '../../service/category-rest.service'
import {FormUtilsService} from '../../service/form-utils.service'
import {DisplayErrorDirective} from '../directive/display-error.directive'
import {CatType} from '../../model/core/category-type.enum'
import {CatFrequency} from '../../model/core/category-frequency.enum'

@Component({
    selector: 'money-admin-category',
    templateUrl: 'app/view/admin/category.html',
    directives: [DisplayErrorDirective]
})

export class AdminCategoryComponent {
    categories: Array<Category>;
    createForm: ControlGroup;
    name: Control;
    yearList:Array<number>;

    constructor(private _categoryRestService : CategoryRestService, private _formUtilsService: FormUtilsService, fb: FormBuilder) {

      this.yearList = [2014, 2015, 2016];

      this._categoryRestService.list().subscribe(categories => {
        this.categories = categories;
      });

      this.createForm = fb.group({
        name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
        type: fb.control('', Validators.required),
        frequency: fb.control('', Validators.required),
        years: fb.control([], Validators.compose([Validators.required]))
      });
    }

    yearsValueChange(event){
      let allSelectedYears = [];
      for (let i in event.target.selectedOptions){
        if (event.target.selectedOptions[i].value) {
          allSelectedYears.push(event.target.selectedOptions[i].value);
        }
      }
      (<Control> this.createForm.controls['years']).updateValue(allSelectedYears);
    }

    onCreate(): void {
      let controls = this.createForm.controls;
      let newCateg: Category = new Category(controls['name'].value, CatType[<string>controls['type'].value], CatFrequency[<string>controls['frequency'].value], controls['years'].value);
      this._categoryRestService.create(newCateg).subscribe(response => {
        this.categories.push(response.json());
        this._formUtilsService.reset(this.createForm, "name", "type", "frequency", "years");
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
