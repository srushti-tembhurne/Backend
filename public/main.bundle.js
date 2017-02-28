webpackJsonp([0,4],{

/***/ 1018:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(438);


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var Subject_1 = __webpack_require__(11);
var router_1 = __webpack_require__(49);
var DataTransferService = (function () {
    function DataTransferService(router) {
        this.router = router;
        // Observable string sources
        this.emitChangeSource = new Subject_1.Subject();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
        this.navFlag = false;
    }
    // Service message commands
    DataTransferService.prototype.emitChange = function (change) {
        this.emitChangeSource.next(change);
    };
    //function used to send data from one component to anoher
    DataTransferService.prototype.sendData = function (data) { this.data = data; };
    //function used to recieve data wich was sent by sendData method
    DataTransferService.prototype.recievData = function () { return this.data; };
    //Method used to check the user is loggedin or not and redirect respectivley 
    DataTransferService.prototype.isLoggedIn = function () {
        var pathName = window.location.pathname;
        if (window.sessionStorage) {
            this.userDetails = window.sessionStorage.getItem('username');
        }
        if (!this.userDetails) {
            this.router.navigateByUrl('/login');
        }
        else {
            if (pathName.indexOf('login') > -1) {
                this.router.navigateByUrl('/home');
            }
            else {
                this.router.navigateByUrl(pathName);
            }
        }
    };
    DataTransferService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], DataTransferService);
    return DataTransferService;
    var _a;
}());
exports.DataTransferService = DataTransferService;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/service/data-transfer.service.js.map

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(49);
var data_transfer_service_1 = __webpack_require__(123);
var common_service_1 = __webpack_require__(93);
var AppComponent = (function () {
    function AppComponent(router, DT, CS) {
        var _this = this;
        this.router = router;
        this.DT = DT;
        this.CS = CS;
        this.showNav = true;
        this.open = false;
        this.DT.changeEmitted$.subscribe(function (text) {
            _this.InVisible = text.visible;
        });
        this.router.events.subscribe(function (data) {
            _this.UserName = window.sessionStorage.getItem('username') || "User";
            var visibleFlag = _this.DT.recievData() || false;
            (visibleFlag !== false) ? _this.InVisible = visibleFlag.visible : _this.InVisible = visibleFlag;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.InVisible = false;
    };
    AppComponent.prototype.toggleClass = function () {
        this.showNav = !this.showNav;
    };
    AppComponent.prototype.onlogout = function () {
        this.CS.getService('/api/logout').subscribe(function (data) {
            if (data.success) {
                var storage = window.sessionStorage;
                storage.setItem('token', '');
                storage.setItem('expiry_in', '');
                storage.setItem('username', '');
            }
        }, function (err) { console.log(err); }, function () { });
    };
    AppComponent.prototype.onCancel = function () {
        this.open = false; // for create VM component
        this.router.navigateByUrl('/');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: __webpack_require__(745),
            styles: [__webpack_require__(739)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof data_transfer_service_1.DataTransferService !== 'undefined' && data_transfer_service_1.DataTransferService) === 'function' && _b) || Object, (typeof (_c = typeof common_service_1.CommonService !== 'undefined' && common_service_1.CommonService) === 'function' && _c) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/app.component.js.map

/***/ },

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(236);
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isAuthenticated = false;
    }
    AuthService.prototype.authenticateNow = function (usercreds) {
        var _this = this;
        var headers = new http_1.Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        this.http.post('http://localhost:4200/authenticate', creds, { headers: headers }).subscribe(function (data) {
            if (data.json().success) {
                window.localStorage.setItem('auth_key', data.json().token);
                _this.isAuthenticated = true;
            }
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/service/auth.service.js.map

/***/ },

/***/ 437:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 437;


/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__(576);
var platform_browser_dynamic_1 = __webpack_require__(530);
var core_1 = __webpack_require__(1);
var environment_1 = __webpack_require__(575);
var _1 = __webpack_require__(572);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(_1.AppModule);
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/main.js.map

/***/ },

/***/ 560:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var platform_browser_1 = __webpack_require__(120);
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(76);
var http_1 = __webpack_require__(236);
var clarity_angular_1 = __webpack_require__(577);
var app_component_1 = __webpack_require__(175);
var app_routing_1 = __webpack_require__(561);
var forms_2 = __webpack_require__(76);
var auth_service_1 = __webpack_require__(369);
var common_service_1 = __webpack_require__(93);
var data_transfer_service_1 = __webpack_require__(123);
var ng2_pagination_1 = __webpack_require__(733);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                app_routing_1.routComponents
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule, forms_2.ReactiveFormsModule,
                http_1.HttpModule, ng2_pagination_1.Ng2PaginationModule,
                clarity_angular_1.ClarityModule.forRoot(),
                app_routing_1.ROUTING
            ],
            providers: [auth_service_1.AuthService, common_service_1.CommonService, data_transfer_service_1.DataTransferService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/app.module.js.map

/***/ },

/***/ 561:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__(49);
var about_component_1 = __webpack_require__(565);
var home_component_1 = __webpack_require__(567);
var createVM_component_1 = __webpack_require__(563);
var login_component_1 = __webpack_require__(568);
var forgotpw_component_1 = __webpack_require__(566);
var Notfound_component_1 = __webpack_require__(570);
var signup_component_1 = __webpack_require__(569);
var underConstruction_component_1 = __webpack_require__(571);
var monitor_component_1 = __webpack_require__(564);
exports.ROUTES = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'createVM', component: createVM_component_1.CreateVMComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'monitor', component: monitor_component_1.MonitorComponent },
    { path: 'login/forgotpw', component: forgotpw_component_1.ForgotPasswordComponent },
    { path: 'login/signup', component: signup_component_1.SignupComponent },
    { path: '**', component: Notfound_component_1.PageNotFound, pathMatch: 'full' }
];
exports.ROUTING = router_1.RouterModule.forRoot(exports.ROUTES);
exports.routComponents = [about_component_1.AboutComponent, home_component_1.HomeComponent, createVM_component_1.CreateVMComponent, login_component_1.LoginComponent, forgotpw_component_1.ForgotPasswordComponent, Notfound_component_1.PageNotFound, signup_component_1.SignupComponent, underConstruction_component_1.UnderConstruction, monitor_component_1.MonitorComponent];
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/app.routing.js.map

/***/ },

/***/ 562:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(49);
var AuthManager = (function () {
    function AuthManager(router) {
        this.router = router;
    }
    AuthManager.prototype.CanActivate = function (next, state) {
        if (window.localStorage.getItem('auth_key'))
            return true;
        console.log('You must be logged in');
        this.router.navigate(['/login']);
        return false;
    };
    AuthManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AuthManager);
    return AuthManager;
    var _a;
}());
exports.AuthManager = AuthManager;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/authmanager.js.map

/***/ },

/***/ 563:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(76);
var router_1 = __webpack_require__(49);
var createVM_model_1 = __webpack_require__(573);
var data_transfer_service_1 = __webpack_require__(123);
var common_service_1 = __webpack_require__(93);
var app_component_1 = __webpack_require__(175);
var CreateVMComponent = (function () {
    function CreateVMComponent(_fb, router, DT, CS, AC) {
        this._fb = _fb;
        this.router = router;
        this.DT = DT;
        this.CS = CS;
        this.AC = AC;
        this.osList = [{ name: 'Ubuntu 8', version: 'ubuntu-8.04-desktop-amd64.iso' },
            { name: 'Ubuntu 14', version: 'ubuntu-14.04.1-server-amd64.iso' },
            { name: 'CentOS 7', version: 'CentOS-7-x86_64-Minimal-1611.iso' },
            { name: 'Windows Server 64bit', version: '8250.0WIN8_X64_SERVER.ISO' }];
        this.vmcreationForm = this._fb.group({
            vmName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            OS: ['', [forms_1.Validators.required]],
            diskSize: ['', [forms_1.Validators.required]],
            cpuCore: ['1', [forms_1.Validators.required]],
            Memory: ['', [forms_1.Validators.required]],
            type: 'create-vm'
        });
    }
    CreateVMComponent.prototype.onSubmit = function () {
        var _this = this;
        var model = this.vmcreationForm.value;
        this.formdata = new createVM_model_1.createVMModel(model.vmName, model.OS, model.diskSize, model.cpuCore, model.Memory, model.type);
        this.CS.postService('/api/request', this.formdata).subscribe(function (data) {
            var str = new String(data.message);
            _this.Res = data;
            _this.AC.open = true;
            _this.AC.modelMsg = _this.Res.result;
            if (_this.Res.success) {
                _this.vmcreationForm.reset({ type: 'create-vm' });
            }
            else if (str.indexOf("Failed to authenticate token") > -1) {
                _this.AC.onlogout();
            }
        }, function (err) {
            console.log(err);
        }, function () { });
    };
    CreateVMComponent.prototype.redirectToHome = function () {
        this.AC.onCancel();
    };
    CreateVMComponent.prototype.ngOnInit = function () {
        /* this.CS.getService('/api/getOS').subscribe(
            data=>{this.osList=data},
            err=>{console.log(err)},
            ()=>{});*/
        //     this.DT.isLoggedIn();
    };
    CreateVMComponent.prototype.ngOnDestroy = function () {
    };
    CreateVMComponent.prototype.onlyNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    };
    CreateVMComponent = __decorate([
        core_1.Component({
            // styleUrls: ['../app/styles.css'],
            template: __webpack_require__(746)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof data_transfer_service_1.DataTransferService !== 'undefined' && data_transfer_service_1.DataTransferService) === 'function' && _c) || Object, (typeof (_d = typeof common_service_1.CommonService !== 'undefined' && common_service_1.CommonService) === 'function' && _d) || Object, (typeof (_e = typeof app_component_1.AppComponent !== 'undefined' && app_component_1.AppComponent) === 'function' && _e) || Object])
    ], CreateVMComponent);
    return CreateVMComponent;
    var _a, _b, _c, _d, _e;
}());
exports.CreateVMComponent = CreateVMComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/VM/create/createVM.component.js.map

/***/ },

/***/ 564:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var MonitorComponent = (function () {
    function MonitorComponent() {
        /*this.CS.getService('').subscribe(
          data=>{this.MonitorList=data},
          err=>{console.log(err)},
          ()=>{ console.log('Completed MONITOR ')}
        );*/
    }
    MonitorComponent.prototype.ngOnInit = function () {
    };
    MonitorComponent = __decorate([
        core_1.Component({
            template: __webpack_require__(747),
            styles: [__webpack_require__(740)]
        }), 
        __metadata('design:paramtypes', [])
    ], MonitorComponent);
    return MonitorComponent;
}());
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/VM/monitor/monitor.component.js.map

/***/ },

/***/ 565:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var core_1 = __webpack_require__(1);
var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent = __decorate([
        core_1.Component({
            styles: [__webpack_require__(741)],
            template: __webpack_require__(748)
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/about/about.component.js.map

/***/ },

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(76);
var router_1 = __webpack_require__(49);
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
    }
    ForgotPasswordComponent.prototype.onlogin = function (model) {
        console.log(JSON.stringify(model));
        //this.forgotPwdfrm.reset();
    };
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPwdfrm = this.formBuilder.group({
            Email: 'Please Enter UR Email'
        });
    };
    ForgotPasswordComponent.prototype.onCancel = function () {
        this.router.navigateByUrl('/');
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            // styleUrls: ['./login.component.scss'],
            template: __webpack_require__(749)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
    var _a, _b;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/forgotpw/forgotpw.component.js.map

/***/ },

/***/ 567:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var core_1 = __webpack_require__(1);
var data_transfer_service_1 = __webpack_require__(123);
var router_1 = __webpack_require__(49);
var common_service_1 = __webpack_require__(93);
var app_component_1 = __webpack_require__(175);
var HomeComponent = (function () {
    function HomeComponent(route, DT, CS, AC) {
        this.route = route;
        this.DT = DT;
        this.CS = CS;
        this.AC = AC;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.UserCommonObj = this.DT.recievData();
        this.DT.isLoggedIn();
        this.DT.sendData({ visible: false });
        /*this.CS.getService('/api/request').subscribe(
            data => {
                if (data.success) {
                    this.Requestdata = data;
                    this.Requestdata = Array.of(this.Requestdata);
                    this.Requestdata = this.Requestdata[0].result;
                    this.Requestdata = this.Requestdata.sort((a, b) => {
                        return (parseInt(a.id) - parseInt(b.id)) * -1;
                    });
                    this.count = this.Requestdata.length;

                } else if (data.message.indexof("Failed to authenticate token")){
                    this.AC.onlogout();
                }

            },
            err => { console.log(err) },
            () => { });*/
        this.onRefresh();
    };
    HomeComponent.prototype.onRefresh = function () {
        var _this = this;
        this.CS.getService('/api/request').subscribe(function (data) {
            var str = new String(data.message);
            if (data.success) {
                _this.Requestdata = data;
                _this.Requestdata = Array.of(_this.Requestdata);
                _this.Requestdata = _this.Requestdata[0].result;
                _this.Requestdata = _this.Requestdata.sort(function (a, b) {
                    return (parseInt(a.id) - parseInt(b.id)) * -1;
                });
                _this.count = _this.Requestdata.length;
                _this.refresh_time = new Date();
            }
            else if (str.indexOf("Failed to authenticate token") > -1) {
                _this.AC.onlogout();
            }
        }, function (err) { console.log(err); }, function () { });
    };
    HomeComponent = __decorate([
        core_1.Component({
            styles: [__webpack_require__(742)],
            template: __webpack_require__(750)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof data_transfer_service_1.DataTransferService !== 'undefined' && data_transfer_service_1.DataTransferService) === 'function' && _b) || Object, (typeof (_c = typeof common_service_1.CommonService !== 'undefined' && common_service_1.CommonService) === 'function' && _c) || Object, (typeof (_d = typeof app_component_1.AppComponent !== 'undefined' && app_component_1.AppComponent) === 'function' && _d) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b, _c, _d;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/home/home.component.js.map

/***/ },

/***/ 568:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(76);
var router_1 = __webpack_require__(49);
var common_service_1 = __webpack_require__(93);
var data_transfer_service_1 = __webpack_require__(123);
__webpack_require__(270);
var LoginComponent = (function () {
    function LoginComponent(_fb, CS, DT, router) {
        this._fb = _fb;
        this.CS = CS;
        this.DT = DT;
        this.router = router;
        this.userAgent = this.CS.getBrowserInfo();
        this.loginForm = this._fb.group({
            email: '',
            password: '',
            userAgent: [this.userAgent, [forms_1.Validators.required]]
        });
        this.DT.sendData({ visible: true });
        this.DT.isLoggedIn();
    }
    LoginComponent.prototype.onlogin = function () {
        var _this = this;
        this.CS.postService('/api/login', this.loginForm.value).subscribe(function (data) { _this.loginResult(data); }, function (err) { console.log(err); }, function () { });
    };
    LoginComponent.prototype.loginResult = function (data) {
        if (data.success) {
            var storage = window.sessionStorage;
            storage.setItem('token', data.token);
            storage.setItem('expiry_in', data.expiry_in);
            storage.setItem('username', data.username);
            this.InVisible = false;
            this.router.navigateByUrl('/home');
        }
        else if (!data.success) {
            this.result = data.result;
            this.InVisible = true;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            styles: [__webpack_require__(743)],
            template: __webpack_require__(751)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof common_service_1.CommonService !== 'undefined' && common_service_1.CommonService) === 'function' && _b) || Object, (typeof (_c = typeof data_transfer_service_1.DataTransferService !== 'undefined' && data_transfer_service_1.DataTransferService) === 'function' && _c) || Object, (typeof (_d = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/login/login.component.js.map

/***/ },

/***/ 569:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(76);
var router_1 = __webpack_require__(49);
var signup_model_1 = __webpack_require__(574);
var common_service_1 = __webpack_require__(93);
__webpack_require__(270);
var SignupComponent = (function () {
    function SignupComponent(_fb, router, CS) {
        this._fb = _fb;
        this.router = router;
        this.CS = CS;
    }
    SignupComponent.prototype.onSubmit = function (model) {
        var _this = this;
        this.formdata = new signup_model_1.signupModel(model.username, model.email, model.password);
        this.CS.postService('http://172.17.163.56:3000/signup', this.formdata).subscribe(function (data) { _this.Res = data; }, function (err) { console.log(err); }, function () { });
    };
    SignupComponent.prototype.onCancel = function () {
        this.router.navigateByUrl('/');
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.signupForm = this._fb.group({
            email: ['', [forms_1.Validators.required]],
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            // styleUrls: ['./login.component.scss'],
            template: __webpack_require__(752)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof common_service_1.CommonService !== 'undefined' && common_service_1.CommonService) === 'function' && _c) || Object])
    ], SignupComponent);
    return SignupComponent;
    var _a, _b, _c;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/signup/signup.component.js.map

/***/ },

/***/ 570:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var PageNotFound = (function () {
    function PageNotFound() {
    }
    PageNotFound = __decorate([
        core_1.Component({
            template: "<h1>404 Page not Found...</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], PageNotFound);
    return PageNotFound;
}());
exports.PageNotFound = PageNotFound;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/underConstruction/Notfound.component.js.map

/***/ },

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var UnderConstruction = (function () {
    function UnderConstruction() {
    }
    UnderConstruction = __decorate([
        core_1.Component({
            template: "<h1>This Page is under construction</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], UnderConstruction);
    return UnderConstruction;
}());
exports.UnderConstruction = UnderConstruction;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/component/underConstruction/underConstruction.component.js.map

/***/ },

/***/ 572:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(175));
__export(__webpack_require__(560));
__export(__webpack_require__(562));
__export(__webpack_require__(369));
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/index.js.map

/***/ },

/***/ 573:
/***/ function(module, exports) {

"use strict";
"use strict";
var createVMModel = (function () {
    function createVMModel(vmName, OS, diskSize, cpuCore, Memory, type) {
        this.vmName = vmName;
        this.OS = OS;
        this.diskSize = diskSize;
        this.cpuCore = cpuCore;
        this.Memory = Memory;
        this.type = type;
    }
    return createVMModel;
}());
exports.createVMModel = createVMModel;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/model/createVM.model.js.map

/***/ },

/***/ 574:
/***/ function(module, exports) {

"use strict";
"use strict";
var signupModel = (function () {
    function signupModel(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    return signupModel;
}());
exports.signupModel = signupModel;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/model/signup.model.js.map

/***/ },

/***/ 575:
/***/ function(module, exports) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
"use strict";
exports.environment = {
    production: false
};
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/environments/environment.js.map

/***/ },

/***/ 576:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
__webpack_require__(591);
__webpack_require__(584);
__webpack_require__(580);
__webpack_require__(586);
__webpack_require__(585);
__webpack_require__(583);
__webpack_require__(582);
__webpack_require__(590);
__webpack_require__(579);
__webpack_require__(578);
__webpack_require__(588);
__webpack_require__(581);
__webpack_require__(589);
__webpack_require__(587);
__webpack_require__(592);
__webpack_require__(1017);
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/polyfills.js.map

/***/ },

/***/ 739:
/***/ function(module, exports) {

module.exports = ".clr-icon.clr-clarity-logo {\n  background-image: url(../images/clarity_logo.svg); }\n\n.bars {\n  color: #fafafa;\n  margin-top: 12px; }\n\n.header-actions {\n  /* .logout:before{\n    content:\"|\";\n    padding-right: 15px;\n\n  }*/ }\n  .header-actions a {\n    font-size: 16px;\n    font-weight: 400;\n    font-family: Metropolis, \"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif;\n    letter-spacing: .01em;\n    color: #fafafa;\n    line-height: 60px;\n    text-decoration: none;\n    margin-right: 1rem;\n    position: relative; }\n\n.main-container {\n  background: #fff; }\n  .main-container .content-area {\n    overflow-y: inherit; }\n\n.visible, .mobile-tab {\n  display: none; }\n\n@media (max-width: 767px) {\n  .header {\n    display: inherit; }\n    .header .branding {\n      padding: 0 5px; }\n  .desktop {\n    display: none; }\n  .mobile-tab {\n    display: block; } }\n"

/***/ },

/***/ 740:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 741:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 742:
/***/ function(module, exports) {

module.exports = ".refresh {\n  font-size: 22px;\n  float: right;\n  display: block;\n  clear: both;\n  padding-bottom: 10px; }\n  .refresh span {\n    font-size: 12px;\n    padding-left: 5px; }\n\ntr:nth-child(even) {\n  background: #D9E4EA; }\n\ntd, th {\n  text-align: left; }\n"

/***/ },

/***/ 743:
/***/ function(module, exports) {

module.exports = ".login-wrapper {\n  background: none; }\n  .login-wrapper .login {\n    margin: 0 auto; }\n    .login-wrapper .login:after {\n      display: none; }\n    .login-wrapper .login .login-group .btn {\n      margin-top: 20px; }\n"

/***/ },

/***/ 745:
/***/ function(module, exports) {

module.exports = "<clr-main-container>\n  <clr-header>\n    <button class=\"navbar-toggler hidden-md-up bars\" [ngClass]=\"{'visible': InVisible,'clr-nav-level-1':showNav}\" type=\"button\" (click)=\"toggleClass();\">&#9776;</button>\n    <div class=\"branding\">\n      <a href=\"#\" class=\"nav-link\">\n        <span class=\"clr-icon clr-clarity-logo\"></span>\n        <span class=\"title desktop\">Datacenter Management Framework</span>\n        <span class=\"title mobile-tab\">DCMF</span>\n      </a>\n    </div>\n    <div class=\"header-actions\">\n          <a href=\"#\" [routerLink]=\"['/login']\" [ngClass]=\"{'visible': !InVisible}\">Login </a>\n          <a href=\"#\" [routerLink]=\"['/home']\" [ngClass]=\"{'visible': InVisible}\" >Welcome {{UserName}} </a>\n          <a href=\"#\" [ngClass]=\"{'visible': InVisible}\" class=\"logout\" (click)=\"onlogout()\">Logout</a> \n    </div>\n  </clr-header>\n  \n  <div class=\"content-container\">\n    <div class=\"content-area\">\n      <router-outlet></router-outlet>\n    </div>\n    <nav class=\"sidenav\" [ngClass]=\"{'visible': InVisible,'clr-nav-level-1':showNav}\">\n    <section class=\"sidenav-content\">\n      <a class=\"nav-link\" href=\"#\" [routerLink]=\"['/home']\" [class.active]=\"router.url==='/home' || router.url==='/'\">Home</a>\n      <a class=\"nav-link\" href=\"#\" [routerLink]=\"['/about']\" [class.active]=\"router.url==='/about'\">About</a>\n      <section class=\"nav-group collapsible\">\n        <input id=\"tab2\" type=\"checkbox\">\n        <label for=\"tab2\">VM</label>\n        <ul class=\"nav-list\">\n            <li><a class=\"nav-link\" href=\"#\" [routerLink]=\"['/createVM']\" [class.active]=\"router.url==='/createVM'\">Create VM</a></li>\n            <li><a class=\"nav-link\" routerlinkactive=\"active\"[routerLink]=\"['/monitor']\" [class.active]=\"router.url==='/monitor'\">Monitor</a></li>          \n        </ul>\n      </section>\n    </section>\n  </nav>\n</div>\n</clr-main-container>\n\n<clr-modal [(clrModalOpen)]=\"open\">\n  <h3 class=\"modal-title\">Information </h3>\n  <div class=\"modal-body\">\n    <p>{{modelMsg}}</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onCancel()\">Ok</button>\n  </div>\n</clr-modal>\n\n"

/***/ },

/***/ 746:
/***/ function(module, exports) {

module.exports = "<h1>VM Creation Form</h1>\n<form class=\"form\" [formGroup]=\"vmcreationForm\" (ngSubmit)=\"onSubmit(vmcreationForm.value)\" [hidden]=\"submitted\">\n    <section class=\"form-block\">\n        <div class=\"form-group\">\n            <label for=\"vmName\">VM Name</label>\n            <label for=\"vmName\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"vmcreationForm.get('vmName').invalid\n                    && (vmcreationForm.get('vmName').dirty || vmcreationForm.get('vmName').touched)\">\n                <input type=\"text\" id=\"vmName\"   placeholder=\"Enter VM name\" formControlName=\"vmName\" required>\n                <span class=\"tooltip-content\">\n                    VM Name is Required.\n                </span>\n            </label>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"OS\">Operating System</label>\n            <label for=\"OS\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"vmcreationForm.get('OS').invalid\n                    && (vmcreationForm.get('OS').dirty || vmcreationForm.get('OS').touched)\">\n               \n                <div class=\"select form-control\">\n                    <select id=\"exampleSelect1\" value=\"osList[0]\" formControlName=\"OS\" >\n                        <option *ngFor=\"let os of osList\" value=\"{{os.version}}\">{{os.name}}</option>\n                    </select>\n                </div>\n                \n                <span class=\"tooltip-content\">\n                    Operating System Name is Required.\n                </span>\n            </label>\n        </div>   \n        <div class=\"form-group\">\n            <label for=\"diskSize\">Disk Size (GB) </label>\n            <label for=\"diskSize\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"vmcreationForm.get('diskSize').invalid\n                    && (vmcreationForm.get('diskSize').dirty || vmcreationForm.get('diskSize').touched)\">\n                <input type=\"text\" id=\"diskSize\"  placeholder=\"Enter Disk Size in GBs\" formControlName=\"diskSize\" (keypress)=\"onlyNumberKey($event)\"  required>\n                <span class=\"tooltip-content\">\n                    Disk Size is Required.\n                </span>\n            </label>\n        </div>\n         <div class=\"form-group\">\n            <label for=\"cpuCore\">CPU Core</label>\n            <label for=\"cpuCore\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"vmcreationForm.get('cpuCore').invalid\n                    && (vmcreationForm.get('cpuCore').dirty || vmcreationForm.get('cpuCore').touched)\">\n              \n           \n            <div class=\"select\">\n                <select id=\"cpuCore\" formControlName=\"cpuCore\">\n                    <option>1</option>\n                    <option>2</option>                    \n                </select>\n            </div>\n       \n                <span class=\"tooltip-content\">\n                    CPU Core is Required.\n                </span>\n            </label>\n        </div>\n          \n        <div class=\"form-group\">\n            <label for=\"Memory\">Memory (MB) </label>\n            <label for=\"Memory\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"vmcreationForm.get('Memory').invalid\n                    && (vmcreationForm.get('Memory').dirty || vmcreationForm.get('Memory').touched)\">\n                <input type=\"text\" id=\"Memory\"  placeholder=\"Enter Memory \" formControlName=\"Memory\" (keypress)=\"onlyNumberKey($event)\" required>\n                <span class=\"tooltip-content\">\n                    Memory is Required.\n                </span>\n            </label>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"hidden\" id=\"type\" value=\"create-vm\" formControlName=\"type\"/>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" >Create</button>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"redirectToHome()\">Cancel</button>\n    </section>\n</form>\n\n"

/***/ },

/***/ 747:
/***/ function(module, exports) {

module.exports = "<clr-stack-view>\n    <clr-stack-header>Monitor VM</clr-stack-header>\n\n    <clr-stack-block [clrSbExpanded]=\"true\">\n        <clr-stack-label>Name - Name</clr-stack-label>\n        <clr-stack-content>VM ID - ID</clr-stack-content>\n         <clr-stack-block>\n            <clr-stack-label>Disk Usage</clr-stack-label>\n            <clr-stack-content>Sub-content 2</clr-stack-content>\n        </clr-stack-block>\n         <clr-stack-block>\n            <clr-stack-label>Memory Usage</clr-stack-label>\n            <clr-stack-content>Sub-content 2</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>CPU Usage</clr-stack-label>\n            <clr-stack-content>Sub-content 2</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>Up Time</clr-stack-label>\n            <clr-stack-content>Sub-content 2</clr-stack-content>\n        </clr-stack-block>\n    </clr-stack-block>\n\n    <clr-stack-block >\n        <clr-stack-label>Label 2</clr-stack-label>\n        <clr-stack-content>Content 2</clr-stack-content>\n        <clr-stack-block>\n            <clr-stack-label>Sub-label 3</clr-stack-label>\n            <clr-stack-content>Sub-content 3</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>Sub-label 4</clr-stack-label>\n            <clr-stack-content>Sub-content 4</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>Sub-label 5</clr-stack-label>\n            <clr-stack-content>Sub-content 5</clr-stack-content>\n        </clr-stack-block>\n    </clr-stack-block>\n\n    <clr-stack-block>\n        <clr-stack-label>Label 3</clr-stack-label>\n        <clr-stack-content>Content 3</clr-stack-content>\n        <clr-stack-block>\n            <clr-stack-label>Sub-label 6</clr-stack-label>\n            <clr-stack-content>Sub-content 6</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>Sub-label 7</clr-stack-label>\n            <clr-stack-content>Sub-content 7</clr-stack-content>\n        </clr-stack-block>\n    </clr-stack-block>\n"

/***/ },

/***/ 748:
/***/ function(module, exports) {

module.exports = "<!--\n  ~ Copyright (c) 2016 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n<!--<p>This is a page to help demonstrate routing.</p>\n<button class=\"btn btn-primary\" (click)=\"open = true\">Show modal</button>\n<clr-modal [(clrModalOpen)]=\"open\">\n  <h3 class=\"modal-title\">I have a nice title</h3>\n  <div class=\"modal-body\">\n    <p>But not much to say...</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline\" (click)=\"open = false\">Cancel</button>\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"open = false\">Ok</button>\n  </div>\n</clr-modal>-->\n\n<p>This is the framework used for creating and managing VMs. Its a workflow based framework.</p>"

/***/ },

/***/ 749:
/***/ function(module, exports) {

module.exports = "<div class=\"forgotpw\">\n    <p>Enter your email address to get the link for password reset</p>\n    <form class=\"login\" [formGroup]=\"forgotPwdfrm\" (ngSubmit)=\"onlogin(forgotPwdfrm.value)\">\n      <label> Email </label> \n    <input type=\"email\" formControlName=\"Email\" id=\"email\" />\n    <div class=\"button\">\n        <button type=\"submit\" class=\"btn btn-primary\">Confirm</button>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"onCancel()\">Cancel</button>\n    </div>\n    </form>    \n</div>\n\n    \n    \n"

/***/ },

/***/ 750:
/***/ function(module, exports) {

module.exports = "<!--\n  ~ Copyright (c) 2016 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<!--<clr-stack-view>\n    <clr-stack-header>List of Requests</clr-stack-header>\n    <clr-stack-block *ngFor=\"let re of Requestdata;let i = index\">\n        <clr-stack-label>Request ID - {{re.id}}</clr-stack-label>\n        <clr-stack-label>Request Type - {{re.type}}</clr-stack-label>\n        <clr-stack-label>Request Status - {{re.status}}</clr-stack-label>\n        <clr-stack-block>\n            <clr-stack-label>Memory</clr-stack-label>\n            <clr-stack-content>{{re.data[0].Memory}}</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>cpuCore</clr-stack-label>\n            <clr-stack-content>{{re.data[0].cpuCore}}</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>diskSize</clr-stack-label>\n            <clr-stack-content>{{re.data[0].diskSize}}</clr-stack-content>\n        </clr-stack-block>\n        <clr-stack-block>\n            <clr-stack-label>vmName</clr-stack-label>\n            <clr-stack-content>{{re.data[0].vmName}}</clr-stack-content>\n        </clr-stack-block>\n    </clr-stack-block>\n</clr-stack-view> -->\n<h1> List of Requests</h1> \n<pagination-controls (pageChange)=\"p = $event\" *ngIf=\"count>10\"></pagination-controls>\n<div class=\"refresh\">\n    <button (click)=\"onRefresh()\"> &#x21bb;</button><span>{{refresh_time | date:\"medium\"}}</span></div>\n<table class=\"table table-responsive\">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>vmName</th>\n            <th>Type</th>\n            <th>Memory</th>\n            <th>cpuCore</th>\n            <th>diskSize</th>\n            <th>Status</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let re of Requestdata | paginate: { itemsPerPage: 10, currentPage: p }\">\n            <td>{{re.id}}</td>\n            <td>{{re.data[0].vmName}}</td>\n            <td>{{re.type}}</td>\n            <td>{{re.data[0].Memory}}</td>\n            <td>{{re.data[0].cpuCore}}</td>\n            <td>{{re.data[0].diskSize}}</td>\n            <td>{{re.status}}  {{re.msg?(\"- \"+re.msg):\"\"}}</td>\n        </tr>\n        <tr *ngIf=\"count==0\">\n            <td colspan=\"7\">No data found</td>\n        </tr>\n    </tbody>\n</table>\n"

/***/ },

/***/ 751:
/***/ function(module, exports) {

module.exports = "<div class=\"login-wrapper\">\n    \n    <form class=\"login\" [formGroup]=\"loginForm\" (ngSubmit)=\"onlogin(loginForm.value)\">\n        <label class=\"title\">\n            Company Name<span class=\"trademark\">&#8482;</span>\n            Product Name&#174;\n        </label>\n        <div class=\"login-group\">\n            <!--<div class=\"auth-source select\">\n                <select id=\"login-auth-source-1\" formControlName=\"UserType\">\n                    <option>Local Users</option>\n                    <option>Administrator</option>\n                </select>\n            </div>-->\n                <input class=\"username\" type=\"email\" id=\"login_username\" placeholder=\"Email\" formControlName=\"email\" required/>\n                <input class=\"password\" type=\"password\" id=\"login_password\" placeholder=\"Password\" formControlName=\"password\"  minlength=\"6\" required/>\n                <input type=\"hidden\" id=\"userAgent\" formControlName=\"userAgent\"/>\n  \n            <div class=\"checkbox\">\n                <input type=\"checkbox\" id=\"rememberme\">\n                <label for=\"rememberme\">\n                    Remember me\n                </label>\n            </div>\n            <div  [ngClass]=\"{'visible': !InVisible,error :InVisible,active :InVisible}\">\n                {{result}} \n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">LOG IN</button>\n            <a [routerLink]=\"['signup']\" class=\"signup\">Sign up for an account</a>\n            <a [routerLink]=\"['forgotpw']\" class=\"signup\">Forgot Password?</a>\n        </div>\n    </form>     \n</div>"

/***/ },

/***/ 752:
/***/ function(module, exports) {

module.exports = "<h1>SignUp Form</h1>\n<form class=\"form\" [formGroup]=\"signupForm\" (ngSubmit)=\"onSubmit(signupForm.value)\" [hidden]=\"submitted\">\n    <section class=\"form-block\">\n        <div class=\"form-group\">\n            <label for=\"email\">E-Mail</label>\n            <label for=\"email\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"signupForm.get('email').invalid\n                    && (signupForm.get('email').dirty || signupForm.get('email').touched)\">\n                <input type=\"email\" id=\"email\"   placeholder=\"Enter email address\" formControlName=\"email\" required>\n                <span class=\"tooltip-content\">\n                    Email is Required.\n                </span>\n            </label>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"username\">User Name</label>\n            <label for=\"username\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"signupForm.get('username').invalid\n                    && (signupForm.get('username').dirty || signupForm.get('username').touched)\">\n                <input type=\"text\" id=\"username\" placeholder=\"Enter User name\" formControlName=\"username\" required>\n                <span class=\"tooltip-content\">\n                    User Name is Required.\n                </span>\n            </label>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <label for=\"password\" aria-haspopup=\"true\" role=\"tooltip\" class=\"tooltip tooltip-validation tooltip-md\"\n            [class.invalid]=\"signupForm.get('password').invalid\n                    && (signupForm.get('password').dirty || signupForm.get('password').touched)\">\n                <input type=\"password\" id=\"password\"  placeholder=\"Enter Password\" formControlName=\"password\" required>\n                <span class=\"tooltip-content\">\n                    Password is Required.\n                </span>\n            </label>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" >Create an Account</button>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"onCancel()\">Cancel</button>\n    </section>\n</form>"

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(236);
__webpack_require__(270);
var CommonService = (function () {
    function CommonService(http) {
        this.http = http;
        this.baseUrl = "http://localhost:3000";
    }
    CommonService.prototype.postService = function (url, data) {
        if (url.indexOf('login') == -1) {
            var headers = new http_1.Headers();
            headers.append('x-access-token', window.sessionStorage.getItem('token'));
            headers.append('username', window.sessionStorage.getItem('username'));
            return this.http.post(this.baseUrl + url, data, { headers: headers }).map(function (res) { return res.json(); });
        }
        return this.http.post(this.baseUrl + url, data).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getService = function (url) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/x-www-form-urlencoded');
        headers.append('x-access-token', window.sessionStorage.getItem('token'));
        headers.append('username', window.sessionStorage.getItem('username'));
        return this.http.get(this.baseUrl + url, { headers: headers }).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getBrowserInfo = function () {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        // In Opera 15+, the true version is after "OPR/" 
        if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 4);
        }
        else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) != -1)
            fullVersion = fullVersion.substring(0, ix);
        if ((ix = fullVersion.indexOf(" ")) != -1)
            fullVersion = fullVersion.substring(0, ix);
        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        return {
            'browserName': browserName,
            'fullVersion': fullVersion,
            'majorVersion': majorVersion,
            'appName': navigator.appName,
            'userAgent': navigator.userAgent
        };
    };
    //Not Included Yet 
    CommonService.prototype.tokenExpiryCheck = function () {
        var expiry = new Date(window.sessionStorage.getItem('expiry_in'));
        if (expiry && this.compareDates(expiry)) {
            return false; //token is not expired
        }
        return true; // token has been expired 
    };
    CommonService.prototype.compareDates = function (expiry) {
        var created = new Date();
        if ((expiry.getFullYear() >= created.getFullYear()) && (expiry.getMonth() >= created.getMonth()) && (expiry.getDay() >= created.getDay())) {
            return true; //token is not expired
        }
        return false; // token has been expired
    };
    CommonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], CommonService);
    return CommonService;
    var _a;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=D:/Project/DMF/trunk/src/src/src/app/service/common.service.js.map

/***/ }

},[1018]);
//# sourceMappingURL=main.bundle.map