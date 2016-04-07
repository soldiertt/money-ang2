System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FilterPreset;
    return {
        setters:[],
        execute: function() {
            FilterPreset = (function () {
                function FilterPreset() {
                    this.catTypeFixed = true;
                    this.catTypeOther = true;
                    this.catTypeIncoming = true;
                    this.catFreqMonthly = true;
                    this.catFreqQuarter = true;
                    this.catFreqYearly = true;
                    this.showTotals = true;
                }
                FilterPreset.build = function (preset) {
                    var newPreset = new FilterPreset();
                    newPreset.catTypeFixed = preset.catTypeFixed;
                    newPreset.catTypeOther = preset.catTypeOther;
                    newPreset.catTypeIncoming = preset.catTypeIncoming;
                    newPreset.catFreqMonthly = preset.catFreqMonthly;
                    newPreset.catFreqQuarter = preset.catFreqQuarter;
                    newPreset.catFreqYearly = preset.catFreqYearly;
                    newPreset.showTotals = preset.showTotals;
                    return newPreset;
                };
                FilterPreset.getKey = function (preset) {
                    var key = "";
                    key += preset.catTypeFixed ? 'Y' : 'N';
                    key += preset.catTypeOther ? 'Y' : 'N';
                    key += preset.catTypeIncoming ? 'Y' : 'N';
                    key += preset.catFreqMonthly ? 'Y' : 'N';
                    key += preset.catFreqQuarter ? 'Y' : 'N';
                    key += preset.catFreqYearly ? 'Y' : 'N';
                    key += preset.showTotals ? 'Y' : 'N';
                    return key;
                };
                return FilterPreset;
            }());
            exports_1("FilterPreset", FilterPreset);
        }
    }
});
