export class Preference {
  id: string;
  useDefaultCsvPath: boolean;
  csvPath: string;

  constructor() {
    this.useDefaultCsvPath = true;
  }

}
