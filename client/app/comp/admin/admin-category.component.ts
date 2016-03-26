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
        years: fb.control([], Validators.required)
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

    /** TEMP ***************************************/
    bulkCreate($event) {
      $event.preventDefault();
      let categs:Array<Category> = [];
      categs.push(new Category("Assurance voiture", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Crèche Liam", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Crédit Hypoth. Argenta", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Electricité", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Li Yun : Beobank", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Li Yun : Proximus", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Maylee : repas/garderies", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Syndicat Smals", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("TV / Internet / Tel.", CatType.FIXED, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Charges Verdurmen-Remy", CatType.FIXED, CatFrequency.QUARTER, [2016]));
      categs.push(new Category("Li Yun : syndicat CSC", CatType.FIXED, CatFrequency.QUARTER, [2016]));
      categs.push(new Category("Mutuelle FMSB", CatType.FIXED, CatFrequency.QUARTER, [2016]));
      categs.push(new Category("Ass. home Argenta", CatType.FIXED, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Ass. vie Argenta", CatType.FIXED, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Précompte immobilier", CatType.FIXED, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Contributions voiture", CatType.FIXED, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Décompte des charges", CatType.FIXED, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Autres entrants", CatType.INCOMING, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Salaire SMALS", CatType.INCOMING, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Remb. FMSB", CatType.INCOMING, CatFrequency.QUARTER, [2016]));
      categs.push(new Category("Contributions", CatType.INCOMING, CatFrequency.YEARLY, [2016]));
      categs.push(new Category("Argent de poche", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Carburant", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Divers", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Frais enfants", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Informatique / Loisirs", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Li Yun", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Nourriture", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Pharmacie / Médecins", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Resto / Sorties", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Vêtements / acc.", CatType.OTHER, CatFrequency.MONTHLY, [2016]));
      categs.push(new Category("Frais voitures", CatType.OTHER, CatFrequency.QUARTER, [2016]));
      categs.push(new Category("Mobilier / Accessoires", CatType.OTHER, CatFrequency.QUARTER, [2016]));
      for (let newCateg of categs) {
        this._categoryRestService.create(newCateg).subscribe(response => {
          //Success
        }, err => console.log(err));
      }
    }
    /** TEMP ***************************************/

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
      let removedYears: Array<number> = this._categoryYearsChecker.removedYears(this.editedCat.years, controls['years'].value);
      let addedYears: Array<number> = this._categoryYearsChecker.addedYears(this.editedCat.years, controls['years'].value);
      if (removedYears.length > 0) {
        this._categoryRestService.existsTxForYears(this.editedCat.id, removedYears).subscribe(exists => {
          if (exists) {
            this.txExistsForRemovedYears = true;
          } else {
            this.updateOk(controls, removedYears, addedYears);
          }
        }, err => console.log(err));
      } else {
        if (addedYears.length > 0) {
          this.updateOk(controls, removedYears, addedYears);
        } else {
          //Nothing change
          this.editedCat = undefined;
        }
      }
    }

    updateOk(controls, removedYears: Array<number>, addedYears: Array<number>):void {
      this.txExistsForRemovedYears = false;
      this.editedCat = this._categoryYearsChecker.addMissingPeriods(this.editedCat, addedYears);
      this.editedCat = this._categoryYearsChecker.removedOldPeriods(this.editedCat, removedYears);
      this.editedCat.years = controls['years'].value;
      this._categoryRestService.update(this.editedCat).subscribe(response => {
        this.editedCat = undefined;
      }, err => console.log(err));
    }

    onDelete(category: Category) {
      let categIndex = this.categories.indexOf(category);
      if (categIndex > -1) {

        this._categoryRestService.existsTxForYears(category.id, category.years).subscribe(exists => {
          if (exists) {
            console.error("Cannot delete category containing transactions !");
          } else {
            this._categoryRestService.delete(category.id).subscribe(response => {
              this.categories.splice(categIndex, 1);
            })
          }
        }, err => console.log(err));
      } else {
        console.error("Cannot find category to delete with id ", category.id);
      }
    }
}
