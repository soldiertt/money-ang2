System.register([], function(exports_1) {
    var AccountFormValidator;
    return {
        setters:[],
        execute: function() {
            AccountFormValidator = (function () {
                function AccountFormValidator(component) {
                    this.validate = function (control) {
                        var amount = 0;
                        var comm = 0;
                        var date = 0;
                        var desc = 0;
                        var id = 0;
                        var ownAccountName = 0;
                        var ownAccountNumber = 0;
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
                                case "own-account-name":
                                    ownAccountName++;
                                    break;
                                case "own-account-number":
                                    ownAccountNumber++;
                                    break;
                                case "third-party-account-name":
                                    thirdPartyAccountName++;
                                    break;
                                case "third-party-account-number":
                                    thirdPartyAccountNumber++;
                                    break;
                            }
                        }
                        if (amount != 1 || comm != 1 || date != 1 || desc > 1 || id != 1 || ownAccountName > 1
                            || ownAccountNumber > 1 || thirdPartyAccountName != 1 || thirdPartyAccountNumber != 1) {
                            mappingOk = false;
                        }
                        if (mappingOk) {
                            return null;
                        }
                        else {
                            return { "wrongMapping": true };
                        }
                    };
                }
                AccountFormValidator.prototype.isValidNumber = function (control) {
                    if (!isNaN(control.value)) {
                        return null;
                    }
                    else {
                        return { wrongNumber: true };
                    }
                };
                return AccountFormValidator;
            })();
            exports_1("AccountFormValidator", AccountFormValidator);
        }
    }
});
