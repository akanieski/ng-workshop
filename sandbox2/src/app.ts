import {EmployeeListCtrl} from "./employee-list-controller"
import {EmployeeDetailCtrl} from "./employee-detail-controller"
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
                    .when("/employees", <ng.route.IRoute>{
                        controller: EmployeeListCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/employee-list.html"
                    })
                    .when("/employee/:employeeId", <ng.route.IRoute>{
                        controller: EmployeeDetailCtrl,
                        controllerAs: "vm",
                        templateUrl: "src/employee-detail.html"
                    })
                    .otherwise("/employees")
            }])
            
        angular.bootstrap("body", ["SampleApp"]);
        
    }
    
}

export interface IConfig {
    baseUrl: string
}