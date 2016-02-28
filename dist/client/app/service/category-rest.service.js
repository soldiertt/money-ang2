System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var CategoryRestService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            CategoryRestService = (function () {
                function CategoryRestService(_http) {
                    this._http = _http;
                }
                CategoryRestService.prototype.list = function () {
                    return this._http.get('/restapi/category').map(function (res) { return res.json(); });
                };
                CategoryRestService.prototype.listForYear = function (year) {
                    return this._http.get('/restapi/category/search?year=' + year).map(function (res) { return res.json(); });
                };
                CategoryRestService.prototype.existsCategoryForYear = function (categoryId, year) {
                    return this._http.get('/restapi/category/search?id=' + categoryId + '&year=' + year).map(function (res) {
                        if (res) {
                            return res.json();
                        }
                        else {
                            return undefined;
                        }
                    });
                };
                CategoryRestService.prototype.create = function (newCateg) {
                    return this._http.post('/restapi/category', JSON.stringify(newCateg));
                };
                CategoryRestService.prototype.update = function (categ) {
                    return this._http.put('/restapi/category/' + categ.id, JSON.stringify(categ));
                };
                CategoryRestService.prototype.delete = function (categId) {
                    return this._http.delete('/restapi/category/' + categId);
                };
                CategoryRestService.prototype.addTx = function (txFormData) {
                    return this._http.post('/restapi/category/addtx', JSON.stringify(txFormData));
                };
                CategoryRestService.prototype.existsTxForYears = function (categoryId, years) {
                    var yearsParam = "";
                    years.forEach(function (year) {
                        yearsParam += "&years=" + year;
                    });
                    return this._http.get('/restapi/tx/search?categoryId=' + categoryId + yearsParam).map(function (res) {
                        if (res) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                };
                CategoryRestService.prototype.findAllTxForPeriod = function (categoryId, periodId) {
                    return this._http.get('/restapi/tx/search?categoryId=' + categoryId + "&periodId=" + periodId)
                        .map(function (res) { return res.json(); });
                };
                CategoryRestService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CategoryRestService);
                return CategoryRestService;
            })();
            exports_1("CategoryRestService", CategoryRestService);
        }
    }
});
