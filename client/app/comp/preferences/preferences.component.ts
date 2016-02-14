import {Component, OnInit} from 'angular2/core';

import {Preference} from '../../model/core/preference.class'
import {PreferenceRestService} from '../../service/preference-rest.service'

@Component({
  selector: 'money-preferences',
  templateUrl: 'app/view/preferences/index.html',
  directives: []
})

export class PreferencesComponent implements OnInit {
  preference: Preference = new Preference();

  constructor(private _preferenceRestService: PreferenceRestService) {

  }

  ngOnInit() {
    this._preferenceRestService.list().subscribe(data => {
      let prefList:Array<Preference> = data.json();
      if (prefList.length > 0) {
        this.preference = prefList[0];
      } else {
        this.preference = new Preference();
      }
    });
  }

  onSave() {
    if (this.preference.workingYear <= new Date().getFullYear() && this.preference.workingYear > 2000) {
      if (this.preference.id) {
        this._preferenceRestService.update(this.preference).subscribe(response => {
          this.preference = response.json();
          console.log("Preferences were updated");
        });
      } else {
        this._preferenceRestService.create(this.preference).subscribe(response => {
          this.preference = response.json();
          console.log("Preferences were saved");
        });
      }
    } else {
      console.error("Invalid year");
    }
  }
}
