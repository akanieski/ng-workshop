import {EmployeeListCtrl} from "./components/employee-list/employee-list-controller"
import {EmployeeDetailCtrl} from "./components/employee-detail/employee-detail-controller"
import {EmployeeService} from "./services/employee-service"
import {NavbarComponent} from "./components/navbar/navbar-component"
import {LandingCtrl} from "./components/landing/landing-controller"

export class MainApp {
    
    constructor() {
        
        /* Begin application setup here */
        
        angular
            .module("SampleApp", ['ngRoute', 'AdalAngular'])
            
            .constant("config", <IConfig>{
                baseUrl: "http://127.0.0.1:5002"
            })
            
            .service("EmployeeService", EmployeeService)
            
            .component("navBar", new NavbarComponent())
            
            .config(['$locationProvider', function($locationProvider) {
                //$locationProvider.html5Mode(false).hashPrefix('#');
            }])
            
            .config([
                '$httpProvider', 
                'adalAuthenticationServiceProvider', 
                ($httpProvider: ng.IHttpProvider, adalProvider: adal.AdalAuthenticationServiceProvider) => {

                    adalProvider.init({
                        instance: 'https://login.microsoftonline.com/', 
                        tenant: 'nypworkshop.onmicrosoft.com',
                        clientId: '4efcbe41-4ab8-4b31-b036-e3af3f837d29',
                        extraQueryParameter: 'nux=1',
                        //cacheLocation: 'localStorage',
                        requireADLogin: true,
                        anonymousEndpoints: ["/"]
                    }, $httpProvider);
                
                }])
            
            .config(['$routeProvider', function($routeProvider: ng.route.IRouteProvider){
                
                $routeProvider
                    
                    .when("/landing", <ng.route.IRoute>{
                        controller: LandingCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/components/landing/landing.html",
                        requireADLogin: false
                    })
                    
                    .when("/employees", <ng.route.IRoute>{
                        controller: EmployeeListCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/components/employee-list/employee-list.html",
                        requireADLogin: true
                    })
                    
                    .when("/employee/:employeeId", <ng.route.IRoute>{
                        controller: EmployeeDetailCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/components/employee-detail/employee-detail.html",
                        requireADLogin: true
                    })
                    
                    .otherwise("/landing")
            }])
            
        angular.bootstrap("body", ["SampleApp"]);
        
    }
    
}

export interface IConfig {
    baseUrl: string
}