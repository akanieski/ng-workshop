import {NavbarComponent} from "./components/navbar/navbar.component"
import {RosterController} from "./components/roster/roster.controller"
import {ProfileController} from "./components/profile/profile.controller"
import {EmployeeService} from "./services/employee.service"

export class SampleApp {
    
    constructor(appSelector: string) {
        angular
            .module("SampleApp", ['ngRoute'])
            .constant("config", <IConfig>{ apiBaseUrl: "http://127.0.0.1:5002" })
            .service("EmployeeService", EmployeeService)
            .controller("RosterController", RosterController)
            .controller("ProfileController", ProfileController)
            .component("navBar", new NavbarComponent())
            
            .config(['$routeProvider', function($routeProvider) {
                $routeProvider
                    .when("/dashboard", {
                        templateUrl: "src/components/roster/roster.page.html",
                        controller: "RosterController",
                        controllerAs: "vm"
                    })
                    .when("/employees/:employeeId", {
                        templateUrl: "src/components/profile/profile.page.html",
                        controller: "ProfileController",
                        controllerAs: "vm"
                    })
                    .otherwise("/dashboard");
            }])
            
        angular.bootstrap(appSelector, ['SampleApp']);
    }
    
}

export interface IConfig {
    apiBaseUrl: string;
}

export interface IResponse {
    data: any;
    success: boolean;
}