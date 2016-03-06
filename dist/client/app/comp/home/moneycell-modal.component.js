System.register(['angular2/core', 'angular2-modal'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_modal_1;
    var AdditionCalculateWindow;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_modal_1_1) {
                angular2_modal_1 = angular2_modal_1_1;
            }],
        execute: function() {
            /**
             * A Sample of how simple it is to create a new window, with its own injects.
             */
            AdditionCalculateWindow = (function () {
                function AdditionCalculateWindow(dialog, modelContentData) {
                    this.dialog = dialog;
                }
                AdditionCalculateWindow.prototype.fillCellWith1Cent = function () {
                    this.dialog.close();
                };
                AdditionCalculateWindow.prototype.beforeDismiss = function () {
                    return true;
                };
                AdditionCalculateWindow.prototype.beforeClose = function () {
                    return false;
                };
                AdditionCalculateWindow = __decorate([
                    core_1.Component({
                        selector: 'money-cell-modal',
                        styles: ["\n        .custom-modal-container {\n            padding: 15px;\n        }\n        .custom-modal-header {\n            background-color: #219161;\n            color: #fff;\n            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            margin-top: -15px;\n            margin-bottom: 40px;\n        }\n    "],
                        //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
                        // Remove when solved.
                        /* tslint:disable */ template: "\n        <div class=\"container-fluid custom-modal-container\">\n            <div class=\"row custom-modal-header\">\n                <div class=\"col-sm-12\">\n                    <h1>What to do ?</h1>\n                </div>\n            </div>\n            <div class=\"row\" [ngClass]=\"{'myclass' : shouldUseMyClass}\">\n                <div class=\"col-xs-12\">\n                    <div class=\"jumbotron\">\n                        <button (click)=\"fillCellWith1Cent()\">Pay it !</button>\n                    </div>\n                </div>\n            </div>\n        </div>"
                    }), 
                    __metadata('design:paramtypes', [angular2_modal_1.ModalDialogInstance, angular2_modal_1.ICustomModal])
                ], AdditionCalculateWindow);
                return AdditionCalculateWindow;
            })();
            exports_1("AdditionCalculateWindow", AdditionCalculateWindow);
        }
    }
});
