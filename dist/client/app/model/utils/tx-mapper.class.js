System.register(['../core/tx.class'], function(exports_1) {
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
                    setting.fieldMappings.forEach(function (mapping) {
                        switch (mapping.value) {
                            case 'id':
                                outTx.ref = tokens[mapping.index];
                                break;
                            case 'amount':
                                if (mapping.isBelgianNumber) {
                                    var amountStr = tokens[mapping.index].replace(/[.]/g, '').replace(/,/g, '.');
                                    outTx.amount = Number(amountStr);
                                }
                                break;
                            case 'communication':
                                outTx.communication = tokens[mapping.index].trim();
                                break;
                            case 'date':
                                var dateStr = tokens[mapping.index];
                                var parms = dateStr.split(/[\.\-\/]/);
                                var yyyy, mm, dd;
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
                            case 'description':
                                outTx.comment = tokens[mapping.index];
                                break;
                            case 'third-party-account-name':
                                outTx.thirdPartyAccount.name = tokens[mapping.index];
                                break;
                            case 'third-party-account-number':
                                outTx.thirdPartyAccount.number = tokens[mapping.index];
                                break;
                        }
                    });
                    return outTx;
                };
                return TxMapper;
            })();
            exports_1("TxMapper", TxMapper);
        }
    }
});
