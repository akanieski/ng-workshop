import {MainCtrl} from "./main-controller"
import {EmployeeService} from "./employee-service"

export class MainApp {
    
    constructor() {
        
        /* Begin application setup here */
        
        angular
            .module("SampleApp", [])
            .constant("config", <IConfig>{
                baseUrl: "http://127.0.0.1:5002"
            })
            .service("EmployeeService", EmployeeService)
            .controller("MainCtrl", MainCtrl)
            
        angular.bootstrap("body", ["SampleApp"]);
        
    }
    
}

export interface IConfig {
    baseUrl: string
}