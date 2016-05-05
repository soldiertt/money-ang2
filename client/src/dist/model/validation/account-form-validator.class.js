System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccountFormValidator;
    return {
        setters:[],
        execute: function() {
            AccountFormValidator = (function () {
                function AccountFormValidator(component) {
                    var validator = this;
                    validator.validate = function (control) {
                        return validator.validateMapping(component);
                    };
                }
                AccountFormValidator.prototype.validateMapping = function (component) {
                    var amount = 0;
                    var comm = 0;
                    var date = 0;
                    var desc = 0;
                    var id = 0;
                    var thirdPartyAccountName = 0;
                    var thirdPartyAccountNumber = 0;
                    var mappingOk = true;
                    for (var _i = 0, _a = component.accountSetting.fieldMappings; _i < _a.length; _i++) {
                        var mapper = _a[_i];
                        switch (mapper.value) {
                            case "ignore":
                                break;
                            case "amount":
                                amount++;
                                break;
                            case "communication":
                                comm++;
                                break;
                            case "date":
                                date++;
                                break;
                            case "description":
                                desc++;
                                break;
                            case "id":
                                id++;
                                break;
                            case "third-party-account-name":
                                thirdPartyAccountName++;
                                break;
                            case "third-party-account-number":
                                thirdPartyAccountNumber++;
                                break;
                        }
                    }
                    if (amount !== 1 || comm !== 1 || date !== 1 || desc > 1
                        || id > 1
                        || (id !== 1 && !component.accountSetting.generateIdentifier)
                        || (id === 1 && component.accountSetting.generateIdentifier)
                        || thirdPartyAccountName !== 1 || thirdPartyAccountNumber !== 1) {
                        mappingOk = false;
                    }
                    if (mappingOk) {
                        if (this.validTxDate(component)) {
                            if (this.validAmount(component)) {
                                return null;
                            }
                            else {
                                return { "wrongMapping": true };
                            }
                        }
                        else {
                            return { "wrongMapping": true };
                        }
                    }
                    else {
                        return { "wrongMapping": true };
                    }
                };
                AccountFormValidator.prototype.validTxDate = function (component) {
                    var mapping;
                    for (var _i = 0, _a = component.accountSetting.fieldMappings; _i < _a.length; _i++) {
                        var mapper = _a[_i];
                        if (mapper.value === "date") {
                            mapping = mapper;
                        }
                    }
                    var dateStr = component.lineTokens[mapping.index];
                    if (this.isDateDMY(dateStr)) {
                        mapping.isDateDMY = true;
                    }
                    if (this.isDateYMD(dateStr)) {
                        mapping.isDateYMD = true;
                    }
                    return mapping.isDateDMY || mapping.isDateYMD;
                };
                AccountFormValidator.prototype.validAmount = function (component) {
                    var mapping;
                    for (var _i = 0, _a = component.accountSetting.fieldMappings; _i < _a.length; _i++) {
                        var mapper = _a[_i];
                        if (mapper.value === "amount") {
                            mapping = mapper;
                        }
                    }
                    var amountStr = component.lineTokens[mapping.index];
                    amountStr = amountStr.replace(/[.]/g, "").replace(/,/g, ".");
                    if (!isNaN(Number(amountStr))) {
                        mapping.isBelgianNumber = true;
                    }
                    return mapping.isBelgianNumber;
                };
                AccountFormValidator.prototype.isDateDMY = function (str) {
                    var parms = str.split(/[\.\-\/]/);
                    var yyyy = parseInt(parms[2], 10);
                    var mm = parseInt(parms[1], 10);
                    var dd = parseInt(parms[0], 10);
                    var date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
                    return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
                };
                AccountFormValidator.prototype.isDateYMD = function (str) {
                    var parms = str.split(/[\.\-\/]/);
                    var yyyy = parseInt(parms[0], 10);
                    var mm = parseInt(parms[1], 10);
                    var dd = parseInt(parms[2], 10);
                    var date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
                    return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
                };
                AccountFormValidator.prototype.isValidNumber = function (control) {
                    if (!isNaN(control.value)) {
                        return null;
                    }
                    else {
                        return { wrongNumber: true };
                    }
                };
                return AccountFormValidator;
            }());
            exports_1("AccountFormValidator", AccountFormValidator);
        }
    }
});
//# sourceMappingURL=account-form-validator.class.js.map