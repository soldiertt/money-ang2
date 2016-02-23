import {Component} from 'angular2/core';
import {AbstractControl, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';

import {Category}               from '../../model/core/category.class';
import {CatType, CatFrequency}  from '../../model/core/money-enums'
import {CategoryYearsChecker}   from '../../model/utils/category-years-checker'
import {CategoryRestService}    from '../../service/category-rest.service'
import {FormUtilsService}       from '../../service/form-utils.service'
import {DisplayErrorDirective}  from '../directive/display-error.directive'
import {FocusOnInitDirective}   from '../directive/focus-on-init.directive'
import {CategorySorterPipe}     from '../../pipe/money-pipes'

@Component({
    selector: 'money-admin-category',
    templateUrl: 'html/admin/category.html',
    directives: [DisplayErrorDirective, FocusOnInitDirective],
    pipes:[CategorySorterPipe]
})
export class AdminCategoryComponent {
    categories: Array<Category>;
    createForm: ControlGroup;
    editForm: ControlGroup;
    editedCat : Category;
    name: Control;
    yearList:Array<number>;
    txExistsForRemovedYears: boolean = false;

    constructor(private _categoryRestService : CategoryRestService,
      private _formUtilsService: FormUtilsService,
      private _categoryYearsChecker : CategoryYearsChecker,
      fb: FormBuilder) {

      this.yearList = _formUtilsService.getAppYears();

      this._categoryRestService.list().subscribe(categories => {
        this.categories = categories;
      });

      this.createForm = fb.group({
        name: fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
        type: fb.control('', Validators.required),
        frequency: fb.control('', Validators.required),
        years: fb.control([], Validators.compose([Validators.required]))
      });

      this.editForm = fb.group({
        years: fb.control([], Validators.compose([Validators.required]))
      });
    }

    yearsValueChange(event){
      //Multi-value field not yet manage, so do manually
      let allSelectedYears:Array<number> = [];
      for (let i in event.target.selectedOptions){
        if (event.target.selectedOptions[i].value) {
          allSelectedYears.push(Number(event.target.selectedOptions[i].value));
        }
      }
      (<Control> this.createForm.controls['years']).updateValue(allSelectedYears);
    }

    yearsEditValueChange(event){
      //Multi-value field not yet manage, so do manually
      let allSelectedYears:Array<number> = [];
      for (let i in event.target.selectedOptions){
        if (event.target.selectedOptions[i].value) {
          allSelectedYears.push(Number(event.target.selectedOptions[i].value));
        }
      }
      (<Control> this.editForm.controls['years']).updateValue(allSelectedYears);
    }

    onCreate(): void {
      let controls = this.createForm.controls;
      let newCateg: Category = new Category(controls['name'].value, CatType[<string>controls['type'].value], CatFrequency[<string>controls['frequency'].value], controls['years'].value);
      this._categoryRestService.create(newCateg).subscribe(response => {
        this.categories.push(response.json());
        this._formUtilsService.reset(this.createForm, "name", "type", "frequency", "years");
      }, err => console.log(err));
    }

    onEdit(category: Category): void {
      this.editedCat = category;
      (<Control> this.editForm.controls['years']).updateValue(category.years);
    }

    onCancelEdit($event): void {
      $event.preventDefault();
      this.editedCat = undefined;
      this.txExistsForRemovedYears = false;
    }

    onUpdate(): void {
      let controls = this.editForm.controls;
      let removedYears = this._categoryYearsChecker.removedYears(this.editedCat.years, controls['years'].value);
      if (removedYears.length > 0) {
        this._categoryRestService.existsTxForYears(this.editedCat.id, removedYears).subscribe(exists => {
          if (exists) {
            this.txExistsForRemovedYears = true;
          } else {
            this.updateOk(controls);
          }
        });
      } else {
        this.updateOk(controls);
      }
    }

    updateOk(controls):void {
      this.txExistsForRemovedYears = false;
      this.editedCat.years = controls['years'].value;
      this._categoryRestService.update(this.editedCat).subscribe(response => {
        this.editedCat = undefined;
      }, err => console.log(err));
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
