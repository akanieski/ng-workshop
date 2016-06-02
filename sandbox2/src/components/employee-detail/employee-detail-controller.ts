import {Employee} from "../../models"
import {IEmployeeService} from "../../services/employee-service"

export interface IEmployeeDetailRouteParams {
    employeeId: string
}

export class EmployeeDetailCtrl {
    static $inject: string[] = ['$http', 'EmployeeService', '$routeParams']
    private value: string
    private employee: Employee
    
    constructor(private http: ng.IHttpService,
                private employeeSvc: IEmployeeService,
                private routeParams: IEmployeeDetailRouteParams) {
        this.value = "Hello World from TS"
        
        this.employeeSvc
            .getEmployee(this.routeParams.employeeId)
            .then((data) => {
                this.employee = data
            })
        
    }
    
}