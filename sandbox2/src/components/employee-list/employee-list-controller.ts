import {Employee} from "../../models"
import {IEmployeeService} from "../../services/employee-service"

export interface IEmployeeListCtrlScope {
    test: string
    anotherTest: number
}

export class EmployeeListCtrl {
    static $inject: string[] = ['$scope', '$http', 'EmployeeService']
    private value: string
    private employees: Employee[]
    
    constructor(private scope: IEmployeeListCtrlScope, 
                private http: ng.IHttpService,
                private employeeSvc: IEmployeeService) {
        this.value = "Hello World from TS"
        
        this.employeeSvc
            .getEmployees()
            .then((data) => {
                this.employees = data
            })
        
    }

    greet() {
        alert(this.value)
    }
    
}