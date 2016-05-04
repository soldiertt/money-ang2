import {Component} from "@angular/core";
import {ControlGroup, Control, FormBuilder, Validators} from "@angular/common";

import {FilterPreset} from "../../model/core/filter-preset.class";
import {FilterPresetRestService}    from "../../service/filter-preset-rest.service";
import {DisplayErrorDirective}  from "../directive/display-error.directive";
import {FocusOnInitDirective}   from "../directive/focus-on-init.directive";
import {AdminMenuComponent}     from "./admin-menu.component";

@Component({
    selector: "money-admin-preset",
    templateUrl: "html/admin/preset.html",
    directives: [DisplayErrorDirective, FocusOnInitDirective, AdminMenuComponent]
})
export class AdminPresetComponent {

  editForm: ControlGroup;
  filterPresets: Array<FilterPreset> = [];
  editedPreset: FilterPreset;

  constructor(private _filterPresetRestService: FilterPresetRestService, fb: FormBuilder) {
    this._filterPresetRestService.list().subscribe(allPresets => {
      this.filterPresets = allPresets;
    });
    this.editForm = fb.group({
      presetName: fb.control("", Validators.required)
    });
  }

  onDelete(preset: FilterPreset, index: number) {
    this._filterPresetRestService.delete(preset.id).subscribe(resp => {
      console.log("Preset delete");
      this.filterPresets.splice(index, 1);
    }, err => console.log(err));
  }

  onEdit(preset: FilterPreset): void {
    this.editedPreset = preset;
  }

  onCancelEdit($event): void {
    $event.preventDefault();
    this.editedPreset = undefined;
  }

  onUpdate(): void {
    if (this.editedPreset) {
      this._filterPresetRestService.update(this.editedPreset).subscribe(preset => {
        console.log("Preset updated");
        this.editedPreset = undefined;
      });
    }
  }

}
