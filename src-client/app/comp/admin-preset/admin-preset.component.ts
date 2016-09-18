import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {FilterPreset} from "../../model/core/filter-preset.class";
import {FilterPresetRestService}    from "../../service/filter-preset-rest.service";

@Component({
    selector: "money-admin-preset",
    templateUrl: "app/comp/admin-preset/admin-preset.html"
})
export class AdminPresetComponent {

  editForm: FormGroup;
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
