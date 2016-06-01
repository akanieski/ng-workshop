import {EmployeeListCtrl} from "./employee-list-controller"
import {EmployeeService} from "./employee-service"

export class MainApp {
    
    constructor() {
        
        /* Begin application setup here */
        
        angular
            .module("SampleApp", ['ngRoute'])
            .constant("config", <IConfig>{
                baseUrl: "http://127.0.0.1:5002"
            })
            .service("EmployeeService", EmployeeService)
            .controller("EmployeeListCtrl", EmployeeListCtrl)
            .config(['$routeProvider', function($routeProvider: ng.route.IRouteProvider){
                $routeProvider
                    .when("/list", <ng.route.IRoute>{
                        controller: EmployeeListCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/employee-list.html"
                    })
                    .otherwise("/list")
            }])
            
        angular.bootstrap("body", ["SampleApp"]);
        
    }
    
}

export interface IConfig {
    baseUrl: string
}