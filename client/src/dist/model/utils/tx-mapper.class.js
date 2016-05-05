System.register(["../core/tx.class"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tx_class_1;
    var TxMapper;
    return {
        setters:[
            function (tx_class_1_1) {
                tx_class_1 = tx_class_1_1;
            }],
        execute: function() {
            TxMapper = (function () {
                function TxMapper() {
                }
                TxMapper.mapLineToTx = function (csvLine, setting) {
                    var tokens = csvLine.split(setting.fieldSeparator);
                    var outTx = new tx_class_1.Tx();
                    outTx.ownAccount.name = setting.name;
                    outTx.ownAccount.number = setting.accountNumber;
                    if (setting.generateIdentifier) {
                        outTx.ref = this.hashString(csvLine);
                    }
                    setting.fieldMappings.forEach(function (mapping) {
                        switch (mapping.value) {
                            case "id":
                                outTx.ref = tokens[mapping.index];
                                break;
                            case "amount":
                                if (mapping.isBelgianNumber) {
                                    var amountStr = tokens[mapping.index].replace(/[.]/g, "").replace(/,/g, ".");
                                    outTx.amount = Number(amountStr) * 100; // !! Store cents to avoid operations problems !
                                }
                                break;
                            case "communication":
                                outTx.communication = tokens[mapping.index].trim();
                                break;
                            case "date":
                                var dateStr = tokens[mapping.index];
                                var parms = dateStr.split(/[\.\-\/]/);
                                var yyyy = void 0, mm = void 0, dd = void 0;
                                if (mapping.isDateDMY) {
                                    yyyy = parseInt(parms[2], 10);
                                    mm = parseInt(parms[1], 10);
                                    dd = parseInt(parms[0], 10);
                                }
                                else if (mapping.isDateYMD) {
                                    yyyy = parseInt(parms[0], 10);
                                    mm = parseInt(parms[1], 10);
                                    dd = parseInt(parms[2], 10);
                                }
                                outTx.date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
                                break;
                            case "description":
                                outTx.comment = tokens[mapping.index];
                                break;
                            case "third-party-account-name":
                                outTx.thirdPartyAccount.name = tokens[mapping.index];
                                break;
                            case "third-party-account-number":
                                outTx.thirdPartyAccount.number = tokens[mapping.index];
                                break;
                        }
                    });
                    return outTx;
                };
                TxMapper.hashString = function (chaine) {
                    var hash = 0, i, chr, len;
                    if (chaine.length === 0)
                        return String(hash);
                    for (i = 0, len = chaine.length; i < len; i++) {
                        chr = chaine.charCodeAt(i);
                        hash = ((hash << 5) - hash) + chr;
                        hash |= 0; // Convert to 32bit integer
                    }
                    return String(hash);
                };
                return TxMapper;
            }());
            exports_1("TxMapper", TxMapper);
        }
    }
});
//# sourceMappingURL=tx-mapper.class.js.map