export class FilterPreset {
  id: string;
  name: string;
  catTypeFixed:boolean = true;
  catTypeOther:boolean = true;
  catTypeIncoming:boolean = true;
  catFreqMonthly:boolean = true;
  catFreqQuarter:boolean = true;
  catFreqYearly:boolean = true;
  showTotals: boolean = true;

  constructor() {
  }

  static build(preset: FilterPreset): FilterPreset {
    let newPreset = new FilterPreset();
    newPreset.catTypeFixed = preset.catTypeFixed;
    newPreset.catTypeOther = preset.catTypeOther;
    newPreset.catTypeIncoming = preset.catTypeIncoming;
    newPreset.catFreqMonthly = preset.catFreqMonthly;
    newPreset.catFreqQuarter = preset.catFreqQuarter;
    newPreset.catFreqYearly = preset.catFreqYearly;
    newPreset.showTotals = preset.showTotals;
    return newPreset;
  }

  static getKey(preset: FilterPreset): string {
    let key = "";
    key += preset.catTypeFixed?'Y':'N';
    key += preset.catTypeOther?'Y':'N';
    key += preset.catTypeIncoming?'Y':'N';
    key += preset.catFreqMonthly?'Y':'N';
    key += preset.catFreqQuarter?'Y':'N';
    key += preset.catFreqYearly?'Y':'N';
    key += preset.showTotals?'Y':'N';
    return key;
  }
}
