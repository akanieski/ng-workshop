import {EmployeeListCtrl} from "./components/employee-list/employee-list-controller"
import {EmployeeDetailCtrl} from "./components/employee-detail/employee-detail-controller"
import {EmployeeService} from "./services/employee-service"

export class MainApp {
    
    constructor() {
        
        /* Begin application setup here */
        
        angular
            .module("SampleApp", ['ngRoute'])
            
            .constant("config", <IConfig>{
                baseUrl: "http://127.0.0.1:5002"
            })
            
            .service("EmployeeService", EmployeeService)
            
            .config(['$routeProvider', function($routeProvider: ng.route.IRouteProvider){
                
                $routeProvider
                
                    .when("/employees", <ng.route.IRoute>{
                        controller: EmployeeListCtrl,
                        controllerAs: "vm",
                        templateUrl: "components/employee-list/employee-list.html"
                    })
                    
                    .when("/employee/:employeeId", <ng.route.IRoute>{
                        controller: EmployeeDetailCtrl,
                        controllerAs: "vm",
                        templateUrl: "components/employee-detail/employee-detail.html"
                    })
                    
                    .otherwise("/employees")
            }])
            
        angular.bootstrap("body", ["SampleApp"]);
        
    }
    
}

export interface IConfig {
    baseUrl: string
}